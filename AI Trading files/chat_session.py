import asyncio
from thread_manager import ThreadManager
from assistant_manager import AssistantManager
import requests
import json
import time
import datetime
import pandas as pd    
import yfinance as yf
import quantstats as qs
from scipy.stats import skew         
import mplfinance as mpf
from mplfinance.original_flavor import candlestick_ohlc  
import matplotlib.ticker as mticker
import matplotlib.pyplot as plt
import alpaca_trade_api as tradeapi
import os
import threading 
from dotenv import load_dotenv
from ai_hedge_fund.src.main import run_hedge_fund
import sys
import numpy as np
import logging
import re

load_dotenv()
# logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Dynamically add the `src` folder to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "ai_hedge_fund", "src")))

NEWS_API_KEY = os.getenv('NEWS_API_KEY')
# Set up the Alpaca API client
ALPACA_API_KEY= os.getenv('ALPACA_API_KEY')
ALPACA_SECRET_KEY = os.getenv('ALPACA_SECRET_KEY')
ASSISTANT_ID= os.getenv('ASSISTANT_ID')
thread_id = os.getenv('THREAD_ID')
BASE_URL = 'https://paper-api.alpaca.markets'
api = tradeapi.REST(ALPACA_API_KEY, ALPACA_SECRET_KEY, BASE_URL, api_version='v2')

logging.basicConfig(level=logging.ERROR)
# Global stop flag for trading
class TradingControl:
    def __init__(self):
        self.lock = threading.Lock()
        self._stop_flag = False
        
    def stop_trading(self):
        with self.lock:
            self._stop_flag = True
            logger.info("Trading has been stopped.")

    def reset_trading(self):
        with self.lock:
            self._stop_flag = False
            logger.info("Trading has been reset.")

    def should_stop(self):
        with self.lock:
            return self._stop_flag
trading_control = TradingControl()

def safe_request(url, params=None, retries=3, delay=2):
    for attempt in range(retries):
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.warning(f"Request failed (Attempt {attempt+1}): {e}")
            time.sleep(delay * (2 ** attempt))  # Exponential backoff
    return None

def place_order(api, symbol, qty, side='buy', order_type='market', limit_price=None, stop_price=None):
    try:
        # Ensure symbol is extracted correctly as a single string
        symbol = get_stock_symbol(symbol)
        if not symbol:
            return {"error": "Invalid stock symbol"}

        logger.info(f"Placing order: {symbol}, Quantity: {qty}, Type: {order_type}, Side: {side}")

        # Check if the asset is tradable
        asset = api.get_asset(symbol)
        if not asset.tradable:
            return {"error": f"Asset {symbol} is not tradable"}
        if not asset.fractionable and not qty.is_integer():
            return {"error": f"Fractional shares not supported for {symbol}"}

        # Validate order types
        if order_type == 'limit' and limit_price is None:
            return {"error": "Limit orders require a limit price."}
        elif order_type == 'stop' and stop_price is None:
            return {"error": "Stop orders require a stop price."}
        elif order_type == 'stop_limit' and (limit_price is None or stop_price is None):
            return {"error": "Stop-limit orders require both a stop price and a limit price."}

        # Submit order
        order = api.submit_order(
            symbol=symbol,  # Now a valid string, not a list
            qty=qty,
            side=side,
            type=order_type,
            time_in_force='gtc',
            limit_price=limit_price if order_type in ['limit', 'stop_limit'] else None,
            stop_price=stop_price if order_type in ['stop', 'stop_limit'] else None
        )

        return {
            "symbol": order.symbol,
            "qty": order.qty,
            "order_type": order.type,
            "status": order.status,
            "submitted_at": order.submitted_at.isoformat() if order.submitted_at else None
        }

    except Exception as e:
        logger.error(f"Order placement error: {str(e)}")
        return {"error": str(e)}


def handle_errors(func):
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except requests.exceptions.RequestException as e:
            logger.error(f"API request failed: {str(e)}")
            return {"error": "API request failed"}
        except tradeapi.rest.APIError as e:
            logger.error(f"Trading API error: {str(e)}")
            return {"error": "Trading API error"}
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return {"error": "Unexpected error occurred"}
    return wrapper

def place_crypto_order(api, crypto_symbol, quantity, side, order_type='market', limit_price=None):
    """Place a cryptocurrency order"""
    try:
        if quantity <= 0:
            raise ValueError("Quantity must be greater than 0.")
        # Validate if limit price is required
        if order_type == 'limit' and limit_price is None:
            raise ValueError("Limit orders require a limit price.")

        # Place a cryptocurrency order using Alpaca API
        order = api.submit_order(
            symbol=crypto_symbol,
            qty=quantity,
            side=side,
            type=order_type,
            limit_price=limit_price if order_type == 'limit' else None,
            time_in_force='gtc'
        )

        print(f"Order placed: {quantity} {crypto_symbol} as a {order_type} order")
        return {
            "symbol": order.symbol,
            "quantity": order.qty,
            "order_type": order.type,
            "status": order.status,
            "submitted_at": order.submitted_at.isoformat() if order.submitted_at else None
        }

    except Exception as e:
        print(f"Error placing crypto order: {str(e)}")
        return f"Error placing crypto order: {str(e)}"

def start_trading(api, symbol, qty, side='buy', order_type='market', 
                       interval_minutes=1, duration_minutes=10, is_crypto=False):
    trading_control.reset_trading()  # Use proper method
    end_time = datetime.datetime.now() + datetime.timedelta(minutes=duration_minutes)
    interval_seconds = interval_minutes * 60

    while not trading_control.should_stop() and datetime.datetime.now() < end_time:
        try:
            if is_crypto:
                place_crypto_order(api, symbol, qty, side, order_type)
            else:
                place_order(api, symbol, qty, side, order_type)
            time.sleep(interval_seconds)
        except Exception as e:
            logger.error(f"Trading error: {str(e)}")
            break

    print("Trading stopped or time duration completed.")



# Function to get portfolio information
def get_portfolio():
    try:
        portfolio = api.list_positions()
        portfolio_value = 0.0  # Initialize portfolio value as float
        portfolio_details = []

        for position in portfolio:
            symbol = position.symbol
            qty = float(position.qty)  # Convert quantity to float
            avg_entry_price = float(position.avg_entry_price)
            stock_value = qty * avg_entry_price
            portfolio_value += stock_value

            portfolio_details.append({
                'symbol': symbol,
                'qty': qty,
                'avg_entry_price': avg_entry_price,
                'stock_value': stock_value
            })

        # Print the total portfolio value and details
        print(f"Total Portfolio Value: {portfolio_value}")
        print("Portfolio Details:")
        for detail in portfolio_details:
            print(detail)

        return {
            'total_portfolio_value': portfolio_value,
            'portfolio_details': portfolio_details
        }

    except Exception as e:
        print(f"Error retrieving portfolio: {str(e)}")
        return f"Error retrieving portfolio: {str(e)}"

def get_past_orders(api, status='all', limit=10):
    """
    Retrieve past orders from Alpaca API, including order ID.

    :param api: Alpaca API object
    :param status: Filter orders by status ('open', 'closed', 'all'). Default is 'all'.
    :param limit: Number of orders to retrieve. Default is 10.
    :return: List of past orders with details, including order ID.
    """
    try:
        # Fetch past orders from the Alpaca API
        orders = api.list_orders(status=status, limit=limit)
        
        # Parse the order details
        order_list = []
        for order in orders:
            order_info = {
                "order_id": order.id,  # Order ID
                "symbol": order.symbol,
                "qty": order.qty,
                "side": order.side,
                "order_type": order.order_type,
                "status": order.status,
                "submitted_at": order.submitted_at.isoformat() if order.submitted_at else None,
                "filled_at": order.filled_at.isoformat() if order.filled_at else None,
                "filled_qty": order.filled_qty,
                "price": order.filled_avg_price
            }
            order_list.append(order_info)
        
        # Return the list of order details
        return order_list

    except Exception as e:
        print(f"Error retrieving past orders: {str(e)}")
        return f"Error retrieving past orders: {str(e)}"

# Function to get the latest price of a stock using barset
def get_latest_price(symbol):
    try:
        # Get the latest bar for the stock symbol
        last_quote = api.get_latest_bar(symbol)  
        current_price=last_quote.c
    
        return f"The current price for {symbol} is: ${current_price}"   
    except Exception as e:
        print(f"Error retrieving price for {symbol}: {e}")
        return None

# Function to get the cash balance in the Alpaca account
def get_cash_balance():
    try:
        account = api.get_account()
        return f"Available cash balance is {account.cash}"
    except Exception as e:
        print(f"Error retrieving cash balance: {e}")
        return None

def calculate_metric(data, metric, risk_free_rate=0.02):
    returns = data['Adj Close'].pct_change().dropna()
    if metric == 'daily_returns':
        return round(returns.mean() * 100, 2)
    elif metric == 'standard_deviation':
        return round(returns.std() * 100, 2)
    elif metric == 'skewness':
        return round(skew(returns), 2)
    elif metric == 'kurtosis':
        return round(qs.stats.kurtosis(returns), 2)
    elif metric == 'sharpe_ratio':
        excess_returns = returns - risk_free_rate/252
        return round(excess_returns.mean() / excess_returns.std() * np.sqrt(252), 2)
    return None

def get_financial_metric(identifier, metric, start_year=None, end_year=None):
    symbol = get_stock_symbol(identifier)
    if not symbol:
        return {"error": "Invalid company name or ticker symbol"}
    
    try:
        start_date = f"{start_year}-01-01" if start_year else "1900-01-01"
        end_date = f"{end_year}-12-31" if end_year else datetime.datetime.now().strftime("%Y-%m-%d")
        data = yf.download(symbol, start=start_date, end=end_date)
        if data.empty:
            return {"error": f"No data found for {symbol}"}
        result = calculate_metric(data, metric)
        return {metric: result} if result else {"error": "Invalid metric"}
    except Exception as e:
        return {"error": str(e)}

MANUAL_TICKER_MAP = {
    "apple": "AAPL",
    "microsoft": "MSFT",
    "google": "GOOGL",
    "tesla": "TSLA",
    "amazon": "AMZN",
    "meta": "META",
    "nvidia": "NVDA",
    "netflix": "NFLX",
    "paypal": "PYPL",
    "facebook": "META",
    "alphabet": "GOOGL",
}


def get_stock_symbol(input_str):
    """Extracts a single valid stock symbol from user input."""
    try:
        input_str = input_str.strip().lower()

        # 1. Check manual mapping first
        if input_str in MANUAL_TICKER_MAP:
            return MANUAL_TICKER_MAP[input_str]

        # 2. Check for potential stock symbols (uppercase letters 2-5 characters long)
        potential_symbols = re.findall(r'\b[A-Z]{2,5}\b', input_str.upper())

        # 3. Validate tickers using Yahoo Finance
        for symbol in potential_symbols:
            try:
                ticker = yf.Ticker(symbol)
                if ticker.info and ticker.info.get("quoteType") == "EQUITY":
                    return symbol.upper()  # Return first valid symbol
            except Exception:
                pass  # Ignore invalid symbols

        # 4. Use Yahoo Finance search API if no match is found
        search_url = f"https://query2.finance.yahoo.com/v1/finance/search?q={input_str}&lang=en-US&region=US"
        try:
            response = requests.get(search_url, timeout=5)  # Added timeout
            if response.status_code == 200:
                search_results = response.json()
                if 'quotes' in search_results and search_results['quotes']:
                    for quote in search_results['quotes']:
                        if 'symbol' in quote and quote.get('isYahooFinance', False):
                            return quote['symbol'].upper()  # Return first valid result
        except requests.RequestException as e:
            logger.error(f"Yahoo Finance API request failed: {e}")

        logger.error(f"Symbol lookup failed for: {input_str}")
        return None

    except Exception as e:
        logger.error(f"Error extracting symbol: {e}")
        return None

    except Exception as e:
        logger.error(f"Error extracting symbols: {e}")
        return None

def get_news(topic):
    url = f"https://newsapi.org/v2/everything?q={topic}&apiKey={NEWS_API_KEY}&pageSize=5"
    news_data = safe_request(url)
    
    if news_data and news_data.get("articles"):
        return [{
            "title": article["title"],
            "source": article["source"]["name"],
            "url": article["url"]
        } for article in news_data["articles"]]
    return []


def get_asset_info(symbol, is_crypto=False):
    try:
        ticker = yf.Ticker(symbol)
        info = ticker.info
        if is_crypto:
            return {
                'currentPrice': info.get('regularMarketPrice', 'N/A'),
                'marketCap': info.get('marketCap', 'N/A'),
                'volume24h': info.get('volume24h', info.get('regularMarketVolume', 'N/A')),
                'circulatingSupply': info.get('circulatingSupply', 'N/A'),
                'totalSupply': info.get('totalSupply', 'N/A'),
                'maxSupply': info.get('maxSupply', 'N/A')
            }
        else:
            return {
                'currentPrice': info.get('currentPrice', info.get('regularMarketPrice', 'N/A')),
                'marketCap': info.get('marketCap', 'N/A'),
                'fiftyTwoWeekChange': info.get('52WeekChange', info.get('fiftyTwoWeekChange', 'N/A')),
                'trailingPE': info.get('trailingPE', 'N/A'),
                'forwardPE': info.get('forwardPE', 'N/A'),
                'pegRatio': info.get('pegRatio', 'N/A'),
                'priceToBook': info.get('priceToBook', 'N/A'),
                'revenueGrowth': info.get('revenueGrowth', 'N/A'),
                'earningsGrowth': info.get('earningsGrowth', 'N/A'),
                'profitMargins': info.get('profitMargins', 'N/A'),
                'operatingMargins': info.get('operatingMargins', 'N/A')
            }
    except Exception as e:
        logger.error(f"Error fetching asset info: {str(e)}")
        return {}

def fetch_data(symbol, period='1y', is_crypto=False):
    try:
        if is_crypto and not symbol.endswith('-USD'):
            symbol = f"{symbol}-USD"

        data = yf.download(symbol, period=period)
        if data.empty:
            logger.warning(f"No data found for symbol: {symbol}")
            return None

        required_columns = ['Open', 'High', 'Low', 'Close', 'Volume']
        missing_columns = [col for col in required_columns if col not in data.columns]
        if missing_columns:
            logger.warning(f"Missing required data columns: {', '.join(missing_columns)}")
            return None

        return data
    except Exception as e:
        logger.error(f"Error fetching {symbol} data: {e}")
        return None


class ChatSession:
    def __init__(self, thread_manager: ThreadManager, assistant_manager: AssistantManager, assistant_name: str,
                 model_name: str, assistant_id: str = None, thread_id: str = None):
        self.thread_manager = thread_manager
        self.assistant_manager = assistant_manager
        self.assistant_name = "Devdoot"
        self.model_name = model_name
        self.assistant_id = assistant_id
        self.thread_id = thread_id
        self.trading_bot_thread = None
        self.trading_bot_params = None
        self.exit_flag = False
        self.trading_active = False
        self.auto_execute = False

    def run_hedge_fund_analysis(self, tickers, start_date, end_date, initial_cash, show_reasoning=True, selected_analysts=None):
        """
        Executes the AI Hedge Fund workflow with the given parameters.

        :param tickers: List of stock ticker symbols
        :param start_date: Start date for the analysis
        :param end_date: End date for the analysis
        :param initial_cash: Initial cash position for the portfolio
        :param show_reasoning: Whether to display reasoning from each agent
        :param selected_analysts: List of analysts to include in the workflow
        :return: Results of the hedge fund analysis
        """
        # Prepare portfolio structure
        portfolio = {
            "cash": initial_cash,
            "positions": {ticker: 0 for ticker in tickers}  # Initial positions set to 0
        }

        try:
        # Run the hedge fund analysis
            result = run_hedge_fund(
                tickers=tickers,
                start_date=start_date,
                end_date=end_date,
                portfolio=portfolio,
                show_reasoning=show_reasoning,
                selected_analysts=selected_analysts
            )
            if 'decisions' not in result:
                raise ValueError("No decisions found in analysis result")
            for ticker, decision in result['decisions'].items():
                if not isinstance(decision, dict):
                    continue

                action = decision.get('action')
                quantity = decision.get('quantity', 0)
                confidence = decision.get('confidence', 0)
                reasoning = decision.get('reasoning', 'No reasoning provided')

                if action and quantity > 0:
                    if self.auto_execute:
                        print(f"Auto-executing trade: {action.upper()} {quantity} shares of {ticker}")
                        print(f"Confidence: {confidence}%")
                        print(f"Reasoning: {reasoning}")
                        self.place_order(ticker, quantity, action)
                    else:
                        print(f"\nRecommendation for {ticker}:")
                        print(f"Action: {action.upper()}")
                        print(f"Quantity: {quantity}")
                        print(f"Confidence: {confidence}%")
                        print(f"Reasoning: {reasoning}")
                        user_input = input("\nExecute this trade? (yes/no): ").strip().lower()
                        if user_input == 'yes':
                            self.place_order(ticker, quantity, action)

        except Exception as e:
            print(f"Error in hedge fund analysis: {str(e)}")
            return None

        return result

    def place_order(self, symbol, qty, side='buy'):
        """Executes a trade order based on hedge fund recommendations."""
        order_response = place_order(api, symbol, qty, side)
        print(f"Order placed: {order_response}")

    def toggle_auto_execution(self, status):
        """Enables or disables automatic order execution."""
        self.auto_execute = status
        mode = "enabled" if status else "disabled"
        print(f"Automatic execution {mode}.")

    def parse_hedge_fund_command(self, command):
        # Example command: "hedge fund analysis tickers=[AAPL,MSFT] start_date=2025-01-01 end_date=2025-02-01 initial_cash=100000 show_reasoning=true selected_analysts=[Ackman,Buffett]"
        try:
            params = {}
            # Remove the initial command part
            command = command.replace("hedge fund analysis", "").strip()
            # Split by spaces to get key=value pairs
            pairs = command.split()
            for pair in pairs:
                key, value = pair.split('=')
                key = key.strip()
                value = value.strip().strip('[]')
                if ',' in value:
                    value = value.split(',')
                elif key in ['initial_cash']:
                    value = float(value)
                elif key in ['show_reasoning']:
                    value = value.lower() == 'true'
                params[key] = value
            return params
        except Exception as e:
            print(f"Error parsing command: {e}")
            return None



    def reset_flags(self):
        """Reset all control flags"""
        self.exit_flag = False
        self.trading_active = False

    async def start_session(self):
        print('\033[2J\033[H')  # ANSI escape codes to clear screen and move cursor to top
        print(f"Welcome to {self.assistant_name}! How can I help you today?\n")
        if self.thread_id is None:
            # Get or create a thread
            self.thread_id = await self.get_or_create_thread()

        if self.assistant_id is None:
            # Find or create an assistant
            self.assistant_id = await self.find_or_create_assistant(
                name="Devdoot",
                model=self.model_name
            )
        self.trading_bot_thread = None
        if self.trading_bot_thread is None:
            self.trading_bot_thread = self.start_background_thread(self.trading_bot_manager)

        # Display existing chat history
        await self.display_chat_history()

        # Start the chat loop
        await self.chat_loop()   

    def start_background_thread(self, target_function, *args, **kwargs):
        """
        Start a new background thread to execute a specific function.

        Args:
            target_function (callable): The function to run in the background.
            *args: Arguments to pass to the function.
            **kwargs: Keyword arguments to pass to the function.
        """
        thread = threading.Thread(target=target_function, args=args, kwargs=kwargs, daemon=True)
        thread.start()
        return thread

    async def chat_loop(self):
        try:
            while True:
                user_input = input("\nYou: ").strip()
                if not user_input:
                    continue

                if user_input.lower() in ['exit', 'quit', 'bye']:
                    print("\nGoodbye! Have a great day!")
                    break
                elif user_input.lower().startswith('toggle auto execute'):
                    self.toggle_auto_execution(user_input.lower().endswith('on'))
                    continue
                elif "hedge fund analysis" in user_input:
                    hedge_fund_params = self.parse_hedge_fund_command(user_input)
                    if hedge_fund_params:
                        self.run_hedge_fund_analysis(**hedge_fund_params)
                        continue

                trading_cmd = self.parse_trading_command(user_input)
                if trading_cmd:
                    if trading_cmd['command'] == 'buy':
                        symbol = trading_cmd['params'][1]
                        qty = trading_cmd['params'][0]
                        # Call place_order with extracted params
                        result = place_order(api, symbol, qty, side='buy')
                        print(result)
                        continue

                # Check for hedge fund commands
                hedge_fund_params = self.parse_hedge_fund_command(user_input)
                if hedge_fund_params:
                    print("\nRunning hedge fund analysis...")
                    result = self.run_hedge_fund_analysis(
                        tickers=hedge_fund_params["tickers"],
                        start_date=hedge_fund_params["start_date"],
                        end_date=hedge_fund_params["end_date"],
                        initial_cash=hedge_fund_params["initial_cash"],
                        show_reasoning=True  # Optionally, set to False
                    )
                    print(f"\nHedge Fund Results: {result['decisions']}")
                    continue

                # Handle other user input
                print("\nThinking...", end='\r')  # Show thinking indicator
                response = await self.get_latest_response(user_input)
                if response:
                    print(" " * 20, end='\r')  # Clear thinking indicator
                    print(f"\n{self.assistant_name}: {response}")

        except KeyboardInterrupt:
            print("\n\nSession ended by user. Goodbye!")
        except Exception as e:
            print(f"\nAn error occurred: {str(e)}")
            print("Session ended. Please restart the application.")
    def is_trading_command(self, input_text):
        """Check if the input is a trading command"""
        trading_keywords = ['buy', 'sell', 'trade', 'order']
        return any(keyword in input_text.lower() for keyword in trading_keywords)

    def parse_trading_command(self, input_text):
        patterns = {
            'buy': r"buy\s+(\d+(?:\.\d+)?)\s+(?:shares? of\s+)?(\w+)",
            'sell': r"sell\s+(\d+)\s+(\w+)",
            'stop': r"stop\s+trading",
            'portfolio': r"show\s+portfolio"
        }
        
        input_text = input_text.lower().strip()
        
        for command, pattern in patterns.items():
            match = re.match(pattern, input_text)
            if match:
                return {
                    'command': command,
                    'params': match.groups()
                }
        
        return None

    async def display_chat_history(self):
        """Display chat history in a clean format"""
        messages = await self.thread_manager.list_messages(self.thread_id)
        if not messages or not messages.data:
            return

        print("\nRecent conversation:")
        print("-" * 50)
        
        for message in reversed(messages.data):
            role = "You" if message.role == "user" else self.assistant_name
            if hasattr(message, 'content') and message.content:
                for content in message.content:
                    if content.type == 'text':
                        print(f"\n{role}: {content.text.value}")
                    elif content.type == 'image_file':
                        print(f"\n{role}: [Image File: {content.image_file.file_id}]")
        
        print("-" * 50)

    def trading_bot_manager(self):
        """Background thread for managing trading operations"""
        if not self.trading_bot_params:
            return
            
        params = self.trading_bot_params
        try:
            start_trading(
                api=api,
                symbol=params['symbol'],
                qty=params['qty'],
                side=params['side'],
                order_type=params.get('order_type', 'market'),
                interval_minutes=params.get('interval_minutes', 1),
                duration_minutes=params.get('duration_minutes', 10)
            )
        except Exception as e:
            logging.error(f"Trading bot error: {e}")

    async def get_or_create_thread(self):
        data = self.thread_manager.read_thread_data()
        thread_id = data.get('thread_id')
        if data is None:
            data = {}
        if not thread_id:
            thread = await self.thread_manager.create_thread(messages=[])
            thread_id = thread.id
            
            self.thread_manager.save_thread_data(self.assistant_id, thread_id)

        return thread_id

    async def find_or_create_assistant(self, name: str, model: str):
        """
        Finds an existing assistant by name or creates a new one.

        Args:
            name (str): The name of the assistant.
            model (str): The model ID for the assistant.

        Returns:
            str: The ID of the found or created assistant.
        """
        assistant_id = await self.assistant_manager.get_assistant_id_by_name(name)
        if not assistant_id:
            assistant = await self.assistant_manager.create_assistant(name=name,
                                                                      model=model,
                                                                      instructions="",
                                                                      tools=[{"type": "retrieval"}]
                                                                      )
            assistant_id = assistant.id
            # Step 1. Upload a file to OpenaI embeddings ===
            filepath = "./spacescience.pdf"
            file_streams = [open(filepath, "rb")]

            # Create a vector store caled "Financial Statements"
            vector_store = await self.assistant_manager.beta.vector_stores.create(name="space Information")

            file_batch = await self.assistant_manager.beta.vector_stores.file_batches.upload_and_poll(
            vector_store_id=vector_store.id, files=file_streams
            )
            
            # You can print the status and the file counts of the batch to see the result of this operation.
            print(file_batch.status)
            print(file_batch.file_counts)  

            # Step 2 - Create an assistant 
            assistant = await self.assistant_manager.beta.assistants.create(
                name="Finance Educator",
                instructions="""You are a helpful study assistant who knows a lot about understanding research papers.
                Your role is to summarize papers, clarify terminology within context, and extract key figures and data.
                Cross-reference information for additional insights and answer related questions comprehensively.
                Analyze the papers, noting strengths and limitations. You know how to take a list of article's titles and descriptions and use them to get deeper understanding and give out accurate and comprehensive responses.
                Respond to queries effectively, incorporating feedback to enhance your accuracy.
                Handle data securely and update your knowledge base with the latest research.
                Adhere to ethical standards, respect intellectual property, and provide users with guidance on any limitations.
                Maintain a feedback loop for continuous improvement and user support.
                Your ultimate goal is to facilitate a deeper understanding of complex scientific material, making it more accessible and comprehensible.""",
                            
                tools=[{"type": "code_interpreter"},{"type": "file_search"},
                        {"type": "function",
                            "function": {
                                "name": "get_news",
                                "description": "Get the list of articles/news for the given topic",
                                "parameters": {
                                    "type": "object",
                                    "properties": {
                                        "topic": {
                                            "type": "string",
                                            "description": "The topic for the news, e.g. space",
                                        }
                                    },
                                    "required": ["topic"],
                }
                }
                },
                # Inside the tools list of the assistant creation:
                {
                    "type": "function",
                    "function": {
                        "name": "fetch_data",
                        "description": "Fetch historical price data for a stock or cryptocurrency.",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "symbol": {
                                    "type": "string",
                                    "description": "Asset symbol (e.g., AAPL for stocks, BTC-USD for crypto)."
                                },
                                "period": {
                                    "type": "string",
                                    "description": "Data period (e.g., '1d', '1mo', '1y'). Default: '1y'.",
                                    "default": "1y"
                                },
                                "is_crypto": {
                                    "type": "boolean",
                                    "description": "True for cryptocurrency. Default: False.",
                                    "default": False
                                }
                            },
                            "required": ["symbol"]
                        }
                    }
                },
                {
                    "type": "function",
                    "function": {
                        "name": "get_asset_info",
                        "description": "Retrieve financial metrics for a stock using its ticker symbol.",
                        "parameters": {
                            "type": "object",
                            "properties": {
                                "symbol": {
                                    "type": "string",
                                    "description": "Stock ticker symbol, e.g., AAPL"
                                },
                                "is_crypto": {
                                    "type": "boolean",
                                    "description": "True for cryptocurrency. Default: False.",
                                    "default": False
                                }
                            },
                            "required": ["symbol"]
                        }
                    }
                },
                {"type": "function",
                 "function": {
                    "name": "get_financial_metric",
                    "description": "Retrieve financial metrics for a company based on user-provided metric type.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "company_name": {
                                "type": "string",
                                "description": "The name of the company for which financial metrics are requested. E.g., 'Apple'."
                            },
                            "metric": {
                                "type": "string",
                                "description": "The financial metric to calculate. Options include 'daily_returns', 'standard_deviation', 'skewness'."
                            },
                            
                            "start_year": {
                                "type": "integer",
                                "description": "The start year for the time range of the financial data. E.g., 2010."
                            },  
                            "end_year": {
                                "type": "integer",
                                "description": "The end year for the time range of the financial data. E.g., 2023."
                            },

                        },
                        "required": ["company_name", "metric"]             
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "place_order",
                    "description": "Place an order to buy a stock using the Alpaca API, supporting different order types such as market, limit, stop, and stop-limit. Supports fractional shares.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "symbol": {
                                "type": "string",
                                "description": "The stock symbol of the company to buy shares of, e.g., AAPL for Apple."
                            },
                            "qty": {
                                "type": "number",
                                "description": "The number of shares to buy. Supports fractional shares."
                            },
                            "side": {
                                "type": "string",
                                "enum": ["buy", "sell"],
                                "description": "Whether to buy or sell the stock."
                            },
                            "order_type": {
                                "type": "string",
                                "description": "The type of order to place (market, limit, stop, stop_limit). Default is 'market'.",
                                "enum": ["market", "limit", "stop", "stop_limit"]
                            },
                            "limit_price": {
                                "type": "number",
                                "description": "The price at which to execute a limit or stop-limit order. Required for limit and stop-limit orders.",
                                "nullable": True
                            },
                            "stop_price": {
                                "type": "number",
                                "description": "The price at which to trigger a stop or stop-limit order. Required for stop and stop-limit orders.",
                                "nullable": True
                            }
                        },
                        "required": ["symbol", "qty","side"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "place_crypto_order",
                    "description": "Place a cryptocurrency order using the Alpaca API. Supports market and limit orders for cryptocurrencies like BTC, ETH, and more.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "symbol": {
                                "type": "string",
                                "description": "The symbol of the cryptocurrency to trade, e.g., BTCUSD, ETHUSD."
                            },
                            "quantity": {
                                "type": "number",
                                "description": "The quantity of cryptocurrency to buy or sell."
                            },
                            "side": {
                                "type": "string",
                                "enum": ["buy", "sell"],
                                "description": "Whether to buy or sell the cryptocurrency."
                            },
                            "order_type": {
                                "type": "string",
                                "enum": ["market", "limit"],
                                "description": "The type of order to place. Default is 'market'."
                            },
                            "limit_price": {
                                "type": "number",
                                "description": "The limit price at which to execute a limit order. Required for limit orders.",
                                "nullable": True
                            }
                        },
                        "required": ["symbol", "quantity", "side"]
                    }
                }
            },


          {
                "type": "function",
                "function": {
                    "name": "start_trading",
                    "description": "Starts a trading bot on Alpaca that places a buy or sell order for either stocks or cryptocurrency. If interval_minutes is provided, orders will be placed at that interval; otherwise, the order will be placed only once. Supports fractional shares.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "symbol": {
                                "type": "string",
                                "description": "The symbol of the stock or cryptocurrency to trade, e.g., AAPL for Apple stock or BTCUSD for Bitcoin."
                            },
                            "qty": {
                                "type": "number",
                                "description": "The number of shares or cryptocurrency quantity to buy or sell. Supports fractional shares."
                            },
                            "side": {
                                "type": "string",
                                "enum": ["buy", "sell"],
                                "description": "Whether to buy or sell the asset."
                            },
                            "order_type": {
                                "type": "string",
                                "enum": ["market", "limit", "stop", "stop_limit"],
                                "description": "The type of order to place. Default is 'market'."
                            },
                            "time_in_force": {
                                "type": "string",
                                "enum": ["gtc", "day", "fok", "ioc", "opg", "cls"],
                                "description": "The time in force for the order. Default is 'gtc'."
                            },
                            "interval_minutes": {
                                "type": "integer",
                                "description": "The optional time interval in minutes between each trade execution. If not provided, the order will be placed only once.",
                                "nullable": True
                            },
                            "duration_minutes": {
                                "type": "integer",
                                "description": "The total duration in minutes for executing repeated trades. Used in conjunction with interval_minutes to control the number of executions.",
                                "nullable": True
                            }
                        },
                        "required": ["symbol", "qty", "side"]
                    }
                }
            },
            {"type": "function",
                        "function":{
                        "name": "get_portfolio",
                        "description": "Retrieves the current portfolio information including stock symbols, quantities, average entry price, current price, and market value.",
                        "parameters": {
                            "type": "object",
                            "properties": {},
                            "required": []
                        }
                        }
                },
            {
                "type": "function",
                "function": {
                    "name": "get_past_orders",
                    "description": "Retrieve past stock or crypto orders placed on Alpaca, including details like order ID, symbol, quantity, and side. You can filter orders by status and limit the number of results.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "status": {
                                "type": "string",
                                "description": "Filter orders by their status. Options are 'open', 'closed', or 'all'. Default is 'all'.",
                                "enum": ["open", "closed", "all"],
                                "default": "all"
                            },
                            "limit": {
                                "type": "number",
                                "description": "The maximum number of orders to retrieve. Default is 10.",
                                "default": 10
                            }
                        }
                    }
                }
            },

          {"type": "function",
            "function":
                    {
                    "name": "get_latest_price",
                    "description": "Retrieves the latest price of the specified stock symbol using barset.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                        "symbol": {
                            "type": "string",
                            "description": "The stock symbol to get the latest price for, e.g., AAPL."
                        }
                        },
                        "required": ["symbol"]
                    }
                }
          },
          {"type": "function",
            "function":
                    {
                    "name": "get_cash_balance",
                    "description": "Retrieves the cash balance available in the Alpaca account.",
                    "parameters": {
                        "type": "object",
                        "properties": {},
                        "required": []
                    }
                }
          },
          {
            "type": "function",
            "function": {
                "name": "stop_trading",
                "description": "Stops the trading process for the ongoing trading bot on Alpaca.",
                "parameters": {
                "type": "object",
                "properties": {},
                "required": []
                }
            }
            }


    ],
            model=model,  
    )

            assistant = await self.assistant_manager.beta.assistants.update(
            assistant_id=assistant.id,
            tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
            )

            # === Get the Assis ID ===
            assis_id = assistant.id
            print(assis_id)

        return assistant_id

    async def send_message(self, content):
        return await self.thread_manager.send_message(self.thread_id, content)

    async def display_chat_history(self):
        messages = await self.thread_manager.list_messages(self.thread_id)
        if messages is None:
            return
        print(messages)
        for message in reversed(messages.data):
            role = message.role
            # content = message.content[0].text.value  # Assuming message content is structured this way
            # print(f"{role.title()}: {content}")
            if message.role == "assistant":
                if message.content[0].type=='text':
                    # return message.content[0].text.value
                     content = message.content[0].text.value  # Assuming message content is structured this way
                     print(f"{role.title()}: {content}") 
                       
                elif message.content[0].type == 'image_file':
                      print(f"Image File ID: {message.content[0].image_file.file_id}")      

    async def get_latest_response(self, user_input):
        try:
            # Send user message
            await self.send_message(user_input)
            
            # Create and monitor run
            run = await self.create_run()
            if isinstance(run, str) and "error" in run.lower():
                return f"Error creating run: {run}"
                
            # Wait for completion
            await self.wait_for_assistant()
            
            # Get response
            response = await self.retrieve_latest_response()
            if not response:
                return "Unable to get assistant response"
                
            return response
            
        except Exception as e:
            return f"Error processing request: {str(e)}"

    async def create_run(self):
        # Check if there are any active runs
        runs = await self.thread_manager.list_runs(self.thread_id)
        
        # Loop through existing runs to find any active one
        for run in runs.data:
            if run.status == "active":
                print(f"An active run is still ongoing: {run.id}")
                # Wait for the run to complete or return an error message
                return f"An active run {run.id} is still ongoing. Please wait for it to complete."

        # If no active run is found, create a new one
        return await self.thread_manager.create_run(self.thread_id, self.assistant_id)

############################################################################################################
    async def call_required_functions(self,required_actions,run):
        
        if not run:
            return

        tool_outputs = []

        for action in required_actions["tool_calls"]:
            func_name = action["function"]["name"]
            arguments = json.loads(action["function"]["arguments"])

            if func_name == "get_news":
                output = get_news(topic=arguments["topic"])
                final_str = ""
                for item in output:
                    final_str = "\n".join(f"{news['title']} - {news['source']} ({news['url']})" for news in output)
                tool_outputs.append({"tool_call_id": action["id"], "output": final_str}) 

            # Inside the for loop over tool_calls:
            elif func_name == "fetch_data":
                symbol = arguments.get("symbol")
                period = arguments.get("period", "1y")
                is_crypto = arguments.get("is_crypto", False)
                try:
                    data = fetch_data(symbol, period, is_crypto)
                    if data is not None:
                        output = f"Fetched {period} data for {symbol}. Contains {len(data)} rows."
                    else:
                        output = f"Failed to fetch data for {symbol}."
                    tool_outputs.append({"tool_call_id": action["id"], "output": output})
                except Exception as e:
                    tool_outputs.append({"tool_call_id": action["id"], "output": str(e)})

            elif func_name == "get_asset_info":
                symbol = arguments.get("symbol")
                is_crypto = arguments.get("is_crypto", False)
                try:
                    info = get_asset_info(symbol, is_crypto)
                    if info:
                        output = json.dumps(info, indent=2)
                    else:
                        output = f"No info found for {symbol}."
                    tool_outputs.append({"tool_call_id": action["id"], "output": output})
                except Exception as e:
                    tool_outputs.append({"tool_call_id": action["id"], "output": str(e)})

            elif func_name == "get_financial_metric":
                try:
                    identifier = arguments["company_name"]
                    metric = arguments["metric"]
                    start_year = arguments.get("start_year")
                    end_year = arguments.get("end_year")
                    
                    output = get_financial_metric(
                        identifier=identifier,
                        metric=metric,
                        start_year=start_year,
                        end_year=end_year
                    )
                    
                    if "error" in output:
                        final_str = f"Error: {output['error']}"
                    else:
                        final_str = json.dumps(output, indent=2)
                    
                    tool_outputs.append({"tool_call_id": action["id"], "output": final_str})
                    logger.info("Financial metrics retrieved successfully")
                except Exception as e:
                    tool_outputs.append({"tool_call_id": action["id"], "output": f"Critical error: {str(e)}"})
                    logger.error(f"Error in get_financial_metric: {e}")  

            elif func_name == "place_order":
                try:
                    # Extract and validate the required parameters
                    symbol = str(arguments.get("symbol", "")).upper()
                    qty = float(arguments.get("qty", 0))
                    side = str(arguments.get("side", "buy")).lower()
                    order_type = str(arguments.get("order_type", "market")).lower()
                    limit_price = float(arguments.get("limit_price")) if arguments.get("limit_price") else None
                    stop_price = float(arguments.get("stop_price")) if arguments.get("stop_price") else None

                    # Validate required parameters
                    if not symbol or qty <= 0:
                        raise ValueError("Symbol and quantity > 0 are required")

                    # Call the function to place the stock order with extracted arguments
                    output = place_order(
                        api=api,
                        symbol=symbol,
                        qty=qty,
                        side=side,
                        order_type=order_type,
                        limit_price=limit_price,
                        stop_price=stop_price
                    )

                    # Append the result for the tool call
                    tool_outputs.append({"tool_call_id": action["id"], "output": json.dumps(output)})
                    logger.info("Stock order processed successfully...")

                except Exception as e:
                    error_msg = f"Error processing stock order: {str(e)}"
                    logger.error(error_msg)
                    tool_outputs.append({"tool_call_id": action["id"], "output": json.dumps({"error": error_msg})})


            elif func_name == "start_trading":
                # Log arguments for debugging
                print("Arguments received:", arguments)

                symbol = arguments.get("symbol")
                qty = arguments.get("qty")
                side = arguments.get("side")
                order_type = arguments.get("order_type", 'market')
                interval_minutes = arguments.get("interval_minutes", 1)
                duration_minutes = arguments.get("duration_minutes", 10)

                try:
                    # Call the start_trading function with the correct parameters
                    output = start_trading(
                        api=api,
                        symbol=symbol,
                        qty=qty,
                        side=side,
                        order_type=order_type,
                        interval_minutes=interval_minutes,
                        duration_minutes=duration_minutes
                    )
                    final_str = "Trading operation executed successfully."
                except Exception as e:
                    final_str = str(e)

                tool_outputs.append({"tool_call_id": action["id"], "output": final_str})
                print("Trading operation executed successfully...")


            elif func_name == "place_crypto_order":
                # Extract the required parameters from the user's input
                symbol = arguments.get("symbol")
                quantity = arguments.get("quantity")
                side = arguments.get("side", "buy")  # Default to 'buy' if not provided
                order_type = arguments.get("order_type", "market")  # Default to market order if not provided
                limit_price = arguments.get("limit_price", None)  # Optional limit price for limit orders

                try:
                    # Call the function to place the crypto order
                    output = place_crypto_order(
                        api=api,  # Ensure API instance is passed here
                        symbol=symbol,
                        quantity=quantity,
                        side=side,  # Pass the side (buy/sell)
                        order_type=order_type,
                        limit_price=limit_price
                    )

                    # Append the result for the tool call
                    tool_outputs.append({"tool_call_id": action["id"], "output": json.dumps(output)})
                    print("Crypto order processed successfully...")

                except Exception as e:
                    tool_outputs.append({"tool_call_id": action["id"], "output": str(e)})
                    print(f"Error processing crypto order: {e}")

            elif func_name == "get_past_orders":
                # Extract optional parameters
                status = arguments.get("status", "all")  # Default to 'all' if not provided
                limit = arguments.get("limit", 10)  # Default to 10 if not provided

                # Call the function to get past orders with extracted arguments
                output = get_past_orders(api=api, status=status, limit=limit)

                # Append the result for the tool call
                tool_outputs.append({"tool_call_id": action["id"], "output": json.dumps(output)})
                print("Past orders retrieved successfully.")


            elif func_name == "get_portfolio":
                    try:
                        # Call the get_portfolio function
                        output = get_portfolio()
                        final_str = str(output)
                    except Exception as e:
                        final_str = str(e)
                    tool_outputs.append({"tool_call_id": action["id"], "output": final_str})
                    print("Data retrieved successfully...")

            elif func_name == "get_latest_price":
                    symbol = arguments["symbol"]

                    try:
                        # Call the get_latest_price function
                        output = get_latest_price(symbol)
                        final_str = f"Latest price of {symbol}: {output}"
                    except Exception as e:
                        final_str = str(e)
                    tool_outputs.append({"tool_call_id": action["id"], "output": final_str})
                    print("Data retrieved successfully...")

            elif func_name == "get_cash_balance":
                    try:
                        # Call the get_cash_balance function
                        output = get_cash_balance()
                        final_str = f"Cash balance: {output}"
                    except Exception as e:
                        final_str = str(e)
                    tool_outputs.append({"tool_call_id": action["id"], "output": final_str})
                    print("Data retrieved successfully...")

            elif func_name == "stop_trading":
                    try:
                        TradingControl.stop_trading()
                        final_str = "Trading stopped successfully."
                    except Exception as e:
                        final_str = str(e)
                    tool_outputs.append({"tool_call_id": action["id"], "output": final_str})
                    print("Trading stop command processed successfully...")

                           

        else:
                final_str = f"Error: Unknown function '{func_name}'"


        print("Submitting outputs back to the Assistant...")
        await self.assistant_manager.client.beta.threads.runs.submit_tool_outputs_and_poll(
            thread_id=self.thread_id, run_id=run.id, tool_outputs=tool_outputs
        )
############################################################################################################

    async def wait_for_assistant(self):
        max_retries = 30  # 1 minute timeout (2 seconds * 30)
        retries = 0
        
        while retries < max_retries:
            try:
                runs = await self.thread_manager.list_runs(self.thread_id)
                if not runs or not runs.data:
                    return
                    
                latest_run = runs.data[0]
                print(f"Run status: {latest_run.status}")  # Debug logging
                
                if latest_run.status == "completed":
                    return
                elif latest_run.status == "failed":
                    print(f"Run failed: {latest_run.last_error}")
                    return
                elif latest_run.status == "requires_action":
                    await self.call_required_functions(
                        required_actions=latest_run.required_action.submit_tool_outputs.model_dump(),
                        run=latest_run
                    )
                
                retries += 1
                await asyncio.sleep(2)
                
            except Exception as e:
                print(f"Error while waiting for assistant: {str(e)}")
                return
                
        print("Timeout waiting for assistant response")

    async def retrieve_latest_response(self):
        try:
            response = await self.thread_manager.list_messages(self.thread_id)
            if not response or not response.data:
                return "No response available"
                
            for message in response.data:
                if message.role == "assistant":
                    if not message.content:
                        continue
                        
                    content_item = message.content[0]
                    if content_item.type == 'text':
                        return content_item.text.value
                    elif content_item.type == 'image_file':
                        file_id = content_item.image_file.file_id
                        image_data = await self.assistant_manager.client.files.content(file_id)
                        image_data_bytes = image_data.read()
                        
                        with open(f"{file_id}.png", "wb") as file:
                            file.write(image_data_bytes)
                        return f"Image saved as {file_id}.png"
                        
            return "No assistant response found"
            
        except Exception as e:
            return f"Error retrieving response: {str(e)}"