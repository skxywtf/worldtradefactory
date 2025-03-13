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
import difflib
import threading
import inspect


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

class TradeExecutionQueue:
    def __init__(self):
        self.lock = threading.Lock()
        self.active_trades = {}

    def add_trade(self, symbol):
        with self.lock:
            if symbol in self.active_trades:
                return False  # Trade already in progress
            self.active_trades[symbol] = True
            return True

    def remove_trade(self, symbol):
        with self.lock:
            if symbol in self.active_trades:
                del self.active_trades[symbol]

trade_queue = TradeExecutionQueue()


def safe_request(url, params=None, retries=3, delay=2):
    for attempt in range(retries):
        try:
            response = requests.get(url, params=params)
            print(f"DEBUG: Requesting URL {url} - Status Code: {response.status_code}")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"ERROR: Failed request to {url}: {e}")
    return None


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
    """Extracts a valid stock or crypto symbol from user input."""
    try:
        input_str = input_str.strip().lower()

        # 1. Check for common cryptocurrency names
        crypto_symbols = {
            "bitcoin": "BTCUSD",
            "ethereum": "ETHUSD",
            "dogecoin": "DOGEUSD",
            "cardano": "ADAUSD",
            "litecoin": "LTCUSD",
            "solana": "SOLUSD",
            "polkadot": "DOTUSD"
        }

        if input_str in crypto_symbols:
            return crypto_symbols[input_str]  # Return the correct crypto symbol
        if input_str in MANUAL_TICKER_MAP:
            return MANUAL_TICKER_MAP[input_str]

        # 2. Use Yahoo Finance search API if no direct match is found
        search_url = f"https://query2.finance.yahoo.com/v1/finance/search?q={input_str}&lang=en-US&region=US"
        try:
            response = requests.get(search_url, timeout=5)
            if response.status_code == 200:
                search_results = response.json()
                if 'quotes' in search_results and search_results['quotes']:
                    for quote in search_results['quotes']:
                        if 'symbol' in quote and quote.get('isYahooFinance', False):
                            return quote['symbol'].upper()
        except requests.RequestException as e:
            logger.error(f"Yahoo Finance API request failed: {e}")

        logger.error(f"Symbol lookup failed for: {input_str}")
        return None

    except Exception as e:
        logger.error(f"Error extracting symbol: {e}")
        return None


def place_order(api, symbol, qty, side='buy', order_type='market', limit_price=None, stop_price=None):
    try:
        # Ensure symbol is extracted correctly as a single string
        print(f"DEBUG: Attempting to place order for {symbol}")  # Debugging line
        if not symbol:
            return {"error": "Invalid stock symbol"}

        logger.info(f"Placing order: {symbol}, Quantity: {qty}, Type: {order_type}, Side: {side}")

        # Check if the asset is tradable
        asset = api.get_asset(symbol)
        if not asset.tradable:
            return {"error": f"Asset {symbol} is not tradable"}
        if not asset.fractionable and not float(qty).is_integer():
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
        print(f"DEBUG: Order placed successfully for {symbol}")
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
    """Places a cryptocurrency order with correct parameters."""
    try:
        if quantity <= 0:
            raise ValueError("Quantity must be greater than 0.")

        # ✅ Validate limit price if order type is limit
        if order_type == 'limit' and limit_price is None:
            raise ValueError("Limit orders require a limit price.")

        # ✅ Place a crypto order
        order = api.submit_order(
            symbol=crypto_symbol,
            qty=quantity,
            side=side,
            type=order_type,
            time_in_force='gtc',
            limit_price=limit_price if order_type == 'limit' else None  # ✅ Correctly setting limit price
        )

        print(f"✅ Crypto Order Placed: {quantity} {crypto_symbol} as a {order_type} order")
        return {
            "symbol": order.symbol,
            "quantity": order.qty,
            "order_type": order.type,
            "status": order.status,
            "submitted_at": order.submitted_at.isoformat() if order.submitted_at else None
        }

    except Exception as e:
        print(f"❌ Error placing crypto order: {str(e)}")
        return f"❌ Error placing crypto order: {str(e)}"

trade_lock = threading.Lock()

def start_trading_thread(self, trade_params):
    """Starts a trading bot in a separate thread."""
    if self.trading_active:
        return "Trading bot is already running."

    self.trading_active = True
    self.trading_thread = threading.Thread(target=self.run_trading_bot, args=(trade_params,))
    self.trading_thread.start()
    return "Trading bot started."

def run_trading_bot(self, trade_params):
    """Handles trading logic in a background thread."""
    try:
        symbol = trade_params.get("symbol")
        qty = trade_params.get("qty")
        side = trade_params.get("side", "buy")
        order_type = trade_params.get("order_type", "market")

        if not symbol or not qty:
            return "Invalid trading parameters."

        # Place trade order
        order = api.submit_order(
            symbol=symbol,
            qty=qty,
            side=side,
            type=order_type,
            time_in_force='gtc'
        )

        logger.info(f"Trade executed: {order}")
    except Exception as e:
        logger.error(f"Error in trading bot: {e}")
    finally:
        self.trading_active = False

# Function to get portfolio information
def get_portfolio():
    try:
        with trade_lock:
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
        last_quote = api.get_latest_trade(symbol)  
        current_price=last_quote.price
    
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
    if 'Adj Close' not in data:
        return {"error": "Data does not contain 'Adj Close' column."}

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
        start_date = f"{start_year}-01-01" if start_year else (datetime.datetime.now() - datetime.timedelta(days=365)).strftime("%Y-%m-%d")
        end_date = f"{end_year}-12-31" if end_year else datetime.datetime.now().strftime("%Y-%m-%d")
        data = yf.download(symbol, start=start_date, end=end_date)
        if data.empty:
            return {"error": f"No data found for {symbol}"}
        result = calculate_metric(data, metric)
        return {metric: result} if result else {"error": "Invalid metric"}
    except Exception as e:
        return {"error": str(e)}


def get_news(topic):
    url = f"https://newsapi.org/v2/everything?q={topic}&apiKey={NEWS_API_KEY}&pageSize=5"
    news_data = safe_request(url)

    if not news_data or "articles" not in news_data:
        return "Error retrieving news."
    
    return [
        {"title": article["title"], "source": article["source"]["name"], "url": article["url"]}
        for article in news_data.get("articles", [])
    ]



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
        data = yf.download(symbol, period=period, progress=False)[['Open', 'Close']]
        if data.empty:
            logger.warning(f"No data found for {symbol}")
            return {"error": f"No data found for {symbol}"}
        
        result = data.to_dict()
        del data  
        return result
    except Exception as e:
        logger.error(f"Error fetching {symbol} data: {e}")
        return None


class ChatSession:
    def __init__(self, thread_manager, assistant_manager, assistant_name, model_name, assistant_id, thread_id):
        self.thread_manager = thread_manager
        self.assistant_manager = assistant_manager
        self.assistant_name = assistant_name
        self.model_name = model_name
        self.assistant_id = assistant_id
        self.thread_id = thread_id
        self.thread_ids = {}
        self.trading_bot_thread = None
        self.trading_bot_params = None
        self.exit_flag = False
        self.trading_active = False
        self.auto_execute = False
        self.api = api
        self.trading_session = TradingSession(thread_manager, assistant_manager, thread_id)

    async def get_chat_response(self, user_input):
        """Get the response from the chat assistant."""
        try:
            print(f"DEBUG: Received user input: {user_input}")  # Add this debug print
            response = await self.assistant_manager.get_latest_response(user_input)
            print(f"DEBUG: Assistant Response: {response}")  # Add this debug print
            return response
        except Exception as e:
            print(f"ERROR: Failed to get assistant response: {e}")
            return "Sorry, an error occurred."



    async def run_hedge_fund_analysis(self, tickers, start_date, end_date, initial_cash, show_reasoning=True, selected_analysts=None):
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
        try:
            start_date = start_date or datetime.date.today().isoformat()
            end_date = end_date or (datetime.date.today() + datetime.timedelta(days=30)).isoformat()

            # Convert to datetime objects
            start_dt = datetime.datetime.strptime(start_date, "%Y-%m-%d")
            end_dt = datetime.datetime.strptime(end_date, "%Y-%m-%d")

            if start_dt >= end_dt:
                print("❌ ERROR: End date must be after start date")
                return {"error": "Invalid date range"}
        except ValueError as e:
            print(f"❌ ERROR: Invalid date format: {str(e)}. Use YYYY-MM-DD")
            return {"error": "Invalid date format"}

        # Ensure tickers is a valid list
        if not tickers or not isinstance(tickers, list):
            print("❌ ERROR: Invalid tickers list provided")
            return {"error": "Invalid tickers list"}

        valid_tickers = []
        
        # ✅ Use `auto_resolve_symbol` to get valid tickers (ASYNC)
        for t in tickers:
            resolved_ticker = await self.auto_resolve_symbol(t)
            if resolved_ticker and resolved_ticker != "NONE":
                valid_tickers.append(resolved_ticker)

        # ✅ Fallback if no valid tickers found
        if not valid_tickers:
            print("⚠️ WARNING: No valid tickers found, using default tickers.")
            valid_tickers = ['AAPL', 'MSFT', 'GOOGL']

        print(f"✅ DEBUG: Final tickers list for analysis: {valid_tickers}")

        # Prepare portfolio structure
        portfolio = {
            "cash": initial_cash,
            "positions": {ticker: 0 for ticker in valid_tickers}  # Initialize positions to 0
        }

        try:
            # ✅ Run the hedge fund analysis
            result = run_hedge_fund(
                tickers=valid_tickers,
                start_date=start_date,
                end_date=end_date,
                portfolio=portfolio,
                show_reasoning=show_reasoning,
                selected_analysts=selected_analysts
            )

            if 'decisions' not in result:
                raise ValueError("❌ ERROR: No decisions found in analysis result")

            for ticker, decision in result['decisions'].items():
                if not isinstance(decision, dict):
                    continue

                action = decision.get('action')
                quantity = decision.get('quantity', 0)
                confidence = decision.get('confidence', 0)
                reasoning = decision.get('reasoning', 'No reasoning provided')

                if action and quantity > 0:
                    if self.auto_execute:
                        print(f"✅ Auto-executing trade: {action.upper()} {quantity} shares of {ticker}")
                        print(f"🔹 Confidence: {confidence}%")
                        print(f"📜 Reasoning: {reasoning}")
                        self.place_order(ticker, quantity, action)
                    else:
                        print(f"\n📊 Recommendation for {ticker}:")
                        print(f"➡️ Action: {action.upper()}")
                        print(f"🔢 Quantity: {quantity}")
                        print(f"💡 Confidence: {confidence}%")
                        print(f"📝 Reasoning: {reasoning}")
                        
                        user_input = input("\n⚡ Execute this trade? (yes/no): ").strip().lower()
                        if user_input == 'yes':
                            self.place_order(ticker, quantity, action)

        except Exception as e:
            print(f"❌ ERROR: Hedge fund analysis failed: {str(e)}")
            return {"error": str(e)}

        return result


    async def start_trading_session(self, symbol, qty, interval_minutes, duration_minutes):
        """Start trading bot in a background thread."""
        
        print(f"🟢 Starting trading for {symbol}: {qty} shares every {interval_minutes} minutes for {duration_minutes} minutes.")

        # Prevent multiple trading threads from running
        if self.trading_active:
            print("⚠️ Trading bot is already running!")
            return "Trading bot is already running."

        self.trading_active = True

        def trade_logic():
            end_time = time.time() + (duration_minutes * 60)
            while time.time() < end_time:
                if trading_control.should_stop():
                    print("🚫 Trading session stopped by user.")
                    break
                print(f"✅ Placing order: {qty} {symbol}")
                self.place_order(symbol, qty, "buy")
                time.sleep(interval_minutes * 60)

            print(f"🛑 Trading session completed for {symbol}")
            self.trading_active = False

        # Run the trading bot in a separate thread
        self.trading_thread = threading.Thread(target=trade_logic)
        self.trading_thread.start()
    async def auto_resolve_symbol(self, user_input: str) -> str:
        """Let GPT-4 handle symbol conversion directly"""
        response = await self.assistant_manager.client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{
                "role": "system",
                "content": f"Return ONLY the ticker symbol for: {user_input}. "
                        f"If it is a cryptocurrency, return its trading pair like 'BTCUSD' or 'ETHUSD'. "
                        f"Do NOT return explanations or extra text. If no valid ticker exists, return 'NONE'."
            }],
            temperature=0.0
        )
        result = response.choices[0].message.content.strip()

        if result.upper() == "NONE":
            logger.error(f"Auto-resolve failed: No valid ticker found for {user_input}")
            return None

        return result.upper()

    async def execute_trade_command(self, user_input):
        """Uses LLM to extract trade details and execute the trade."""

        print(f"DEBUG: Processing trade command: {user_input}")  # Debugging

        # ✅ Extract trade details using LLM
        response = await self.assistant_manager.client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": """Extract trade details from the user's command.
                    Return a JSON object with:
                    - action: 'buy' or 'sell'
                    - quantity: number of shares
                    - stock_symbol: proper stock ticker
                    - interval_minutes: (if recurring trade, else null)
                    - duration_minutes: (if recurring trade, else null)
                """},
                {"role": "user", "content": user_input}
            ]
        )

        trade_details = response.choices[0].message.content.strip()
        print(f"DEBUG: LLM Extracted Trade Details: {trade_details}")  # Debugging

        try:
            trade = json.loads(trade_details)
            action = trade["action"]
            quantity = trade["quantity"]
            stock_symbol = trade["stock_symbol"]
            interval_minutes = trade.get("interval_minutes")
            duration_minutes = trade.get("duration_minutes")
        except Exception as e:
            return f"❌ ERROR: Failed to parse trade details - {str(e)}"

        # ✅ Resolve stock symbol
        resolved_symbol = await self.auto_resolve_symbol(stock_symbol)
        if not resolved_symbol or resolved_symbol == "NONE":
            return f"❌ ERROR: Could not resolve symbol for {stock_symbol}"

        print(f"DEBUG: Resolved Symbol: {resolved_symbol}")  # Debugging

        # ✅ FIX: Call `start_trading_session()` from `TradingSession` instead of calling it directly
        if interval_minutes and duration_minutes:
            return await self.start_trading_session(resolved_symbol, quantity, interval_minutes, duration_minutes)
        else:
            return self.place_order(resolved_symbol, quantity, action)


    def place_order(self, symbol, qty, side='buy'):
        """Executes a trade order based on hedge fund recommendations."""
        order_response = place_order(api, symbol, qty, side)
        print(f"Order placed: {order_response}")

    def toggle_auto_execution(self, status):
        """Enables or disables automatic order execution."""
        self.auto_execute = status
        mode = "enabled" if status else "disabled"
        print(f"Automatic execution {mode}.")


    def reset_flags(self):
        """Reset all control flags"""
        self.exit_flag = False
        self.trading_active = False

    async def start_session(self):
        print(f"Welcome to {self.assistant_name}! How can I help you today?\n")
        try:
            data = self.thread_manager.read_thread_data() or {}
            self.thread_id = data.get('thread_id')

            if not self.thread_id:
                print("DEBUG: No existing thread found, creating a new one...")
                self.thread_id = await self.thread_manager.create_new_thread()
                if self.thread_id:
                    self.thread_manager.save_thread_data({'thread_id': self.thread_id})
                else:
                    raise ValueError("Failed to create a new thread_id")

            print(f"DEBUG: Using thread_id: {self.thread_id}")

        except Exception as e:
            print(f"ERROR: Failed to initialize thread session: {e}")

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
        """Handles general assistant interactions."""
        while True:
            user_input = input("\nYou: ").strip()
            if user_input.lower() in ["exit", "quit"]:
                print("\nDevdoot: Goodbye! Have a great day! 👋")
                break
            print("\n🤖 Devdoot is thinking...")
            response = await self.assistant_manager.get_latest_response(user_input)
            print(f"\nDevdoot: {response}")

    def is_trading_command(self, input_text):
        """Check if the input is a trading command"""
        trading_keywords = ['buy', 'sell', 'trade', 'order']
        return any(keyword in input_text.lower() for keyword in trading_keywords)

    async def process_user_input(self, user_input):
        """Processes user input by hardcoding function calls and ensuring correct identification."""
        print(f"DEBUG: Received user input: {user_input}")

        # Identify command type
        trading_keywords = ['buy', 'sell', 'trade', 'order']
        recurring_keywords = ['every', 'interval', 'repeat']
        hedge_fund_keywords = ['run hedge fund', 'hedge fund analysis']
        financial_metrics_keywords = ['financial metric', 'analyze stock', 'calculate metric']
        general_keywords = ['news', 'latest price', 'cash balance', 'portfolio', 'past orders']
        news_keywords = ['news', 'latest news', 'market news']
        portfolio_keywords = ['portfolio', 'my investments', 'holdings']
        order_keywords = ['past orders', 'order history', 'trades executed']
        cash_keywords = ['cash balance', 'available funds', 'account balance']
        stop_keywords = ['stop trading', 'halt trade']
        
        irrelevant_words = {'run', 'hedge', 'fund', 'analysis', 'for'}
        
        is_trade_command = any(keyword in user_input.lower() for keyword in trading_keywords)
        is_recurring_trade = any(keyword in user_input.lower() for keyword in recurring_keywords)
        is_hedge_fund_command = any(keyword in user_input.lower() for keyword in hedge_fund_keywords)
        is_financial_metric_command = any(keyword in user_input.lower() for keyword in financial_metrics_keywords)
        is_news_command = any(keyword in user_input.lower() for keyword in news_keywords)
        is_portfolio_command = any(keyword in user_input.lower() for keyword in portfolio_keywords)
        is_order_command = any(keyword in user_input.lower() for keyword in order_keywords)
        is_cash_command = any(keyword in user_input.lower() for keyword in cash_keywords)
        is_stop_command = any(keyword in user_input.lower() for keyword in stop_keywords)
        is_general_command = any(keyword in user_input.lower() for keyword in general_keywords)

        if is_trade_command:
            print("DEBUG: Identified as Trade Command")
            return await self.execute_trade_command(user_input)

        if is_recurring_trade:
            print("DEBUG: Identified as Recurring Trade Command")
            trade_details = await self.extract_trade_info(user_input) if hasattr(self, 'extract_trade_info') else self.parse_trade_details(user_input)
            symbol = await self.auto_resolve_symbol(trade_details.get('symbol')) or trade_details.get('symbol')
            qty = trade_details.get('qty')
            interval = trade_details.get('interval_minutes')
            duration = trade_details.get('duration_minutes')
            
            if interval and duration:
                return await self.start_trading_session(symbol=symbol, qty=qty, interval_minutes=interval, duration_minutes=duration)
            elif interval and not duration:
                return await self.start_trading_session(symbol=symbol, qty=qty, interval_minutes=interval, duration_minutes=10)
            elif duration and not interval:
                return await self.start_trading_session(symbol=symbol, qty=qty, interval_minutes=2, duration_minutes=duration)
            else:
                return await self.place_order(symbol=symbol, qty=qty, side='buy')
        
        if is_hedge_fund_command:
            print("DEBUG: Identified as Hedge Fund Command")
            raw_tickers = [word.upper() for word in user_input.split() if word.isalpha() and word.lower() not in irrelevant_words]
            tickers = []
            
            for ticker in raw_tickers:
                resolved_ticker = await self.auto_resolve_symbol(ticker)
                if resolved_ticker:
                    tickers.append(resolved_ticker)
                else:
                    logging.error(f"Symbol lookup failed for: {ticker}")
            
            if not tickers:
                tickers = raw_tickers if raw_tickers else ['TSLA', 'AAPL', 'MSFT']  # Use original input if available
                logging.warning("No valid tickers resolved. Using input tickers or default.")
            
            return await self.run_hedge_fund_analysis(
                tickers=tickers,
                start_date=(datetime.date.today() - datetime.timedelta(days=365)).isoformat(),
                end_date=(datetime.date.today() - datetime.timedelta(days=1)).isoformat(),
                initial_cash=100000,
                show_reasoning=True,
                selected_analysts=None
            )
        
        if is_financial_metric_command:
            print("DEBUG: Identified as Financial Metric Command")
            identifier, metric = self.extract_metric_details(user_input)
            return get_financial_metric(identifier=identifier, metric=metric, start_year=2020, end_year=2024)
        
        if is_news_command:
            print("DEBUG: Identified as News Command")
            return get_news(topic='stock market')
        
        if is_portfolio_command:
            print("DEBUG: Identified as Portfolio Command")
            return get_portfolio()
        
        if is_order_command:
            print("DEBUG: Identified as Past Orders Command")
            return get_past_orders(api=self.api, status='all', limit=10)
        
        if is_cash_command:
            print("DEBUG: Identified as Cash Balance Command")
            return get_cash_balance()
        
        if is_stop_command:
            print("DEBUG: Identified as Stop Trading Command")
            return TradingControl.stop_trading()

        if is_general_command:
            print("DEBUG: Identified as General Command")
            return await self.get_chat_response(user_input)

        print("DEBUG: Falling back to General Response")
        return await self.get_chat_response(user_input)



    def extract_metric_details(self, user_input):
        """Extracts the stock identifier and financial metric from user input."""
        words = user_input.lower().split()
        identifier = "AAPL"
        metric = "sharpe_ratio"
        for i, word in enumerate(words):
            if word in ['for', 'of'] and i + 1 < len(words):
                identifier = words[i + 1].upper()
            elif word in ['sharpe', 'skewness', 'kurtosis']:
                metric = word
        return identifier, metric



    async def interpret_user_command(self, user_input):
        """Uses LLM to classify the user's request and return structured intent."""
        response = await self.assistant_manager.client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "Classify the user's request into an action and parameters."},
                {"role": "user", "content": user_input}
            ],
            functions=[
                {
                    "name": "execute_function",
                    "description": "Executes a function based on the user's intent.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "function_name": {"type": "string", "description": "Name of the function to call"},
                            "parameters": {"type": "object", "description": "Parameters for the function"}
                        },
                        "required": ["function_name"]
                    }
                }
            ]
        )

        if response.choices[0].message.function_call:
            return json.loads(response.choices[0].message.function_call.arguments)
        return None


    async def display_chat_history(self):
        """Displays chat history in a formatted way."""
        messages = await self.thread_manager.list_messages(self.thread_id)
        if not messages or not messages.data:
            print("No chat history found.")
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
            self.start_trading_session(
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
        data = self.thread_manager.read_thread_data() or {} 
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
                instructions="""You are an expert financial assistant. Always convert these common terms:
                - "crude oil" → CL=F
                - "gold" → GC=F
                - "silver" → SI=F
                - "apple" → AAPL
                Return exact ticker symbols for any security reference. You do technical analysis of stocks, shares and cryptos accurately. You give all required informations related to market.""",
                            
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
                {
                "type": "function",
                "function": {
                    "name": "auto_resolve_symbol",
                    "description": "Convert natural language to ticker symbols",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "user_input": {
                                "type": "string", 
                                "description": "Raw user input containing security reference"
                            }
                        },
                        "required": ["user_input"]
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
                    "name": "start_trading_session",
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
        if not self.thread_id:
            print("ERROR: Missing thread_id!")  # Debugging
            return "Error: Missing thread_id."

        try:
            print(f"DEBUG: Sending message '{content}' to thread_id: {self.thread_id}")  # Debugging output
            response = await self.thread_manager.send_message(self.thread_id, content)
            return response
        except Exception as e:
            print(f"Error sending message: {str(e)}")
            return f"Error sending message: {str(e)}"


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
    async def call_required_functions(self, required_actions, run):
        """Executes functions dynamically based on LLM response."""
        if not run:
            return

        tool_outputs = []

        for action in required_actions["tool_calls"]:
            func_name = action["function"]["name"]
            arguments = json.loads(action["function"]["arguments"])

            # Dynamically check if function exists
            if hasattr(self, func_name):
                function_to_call = getattr(self, func_name)
                output = await function_to_call(**arguments)
            else:
                output = f"Error: Function '{func_name}' not found."

            tool_outputs.append({"tool_call_id": action["id"], "output": str(output)})

        return tool_outputs

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
        """Retrieves only the latest assistant response to avoid duplicate replies."""
        try:
            response = await self.thread_manager.list_messages(self.thread_id)
            if not response or not response.data:
                return "No response available"

            # ✅ Only return the latest assistant message
            for message in reversed(response.data):  # Messages are returned in reverse order (latest first)
                if message.role == "assistant" and message.content:
                    content_item = message.content[0]
                    if content_item.type == 'text':
                        return content_item.text.value
                    elif content_item.type == 'image_file':
                        return f"Image response received with File ID: {content_item.image_file.file_id}"

            return "No valid response from assistant"

        except Exception as e:
            return f"Error retrieving response: {str(e)}"

class TradingSession:
    def __init__(self, thread_manager, assistant_manager, trading_thread_id):
        self.thread_manager = thread_manager
        self.assistant_manager = assistant_manager
        self.trading_thread_id = trading_thread_id
        self.is_trading_active = False  # ✅ Added trading state control

    async def start_trading(self):
        """Start trading execution."""
        if self.is_trading_active:
            print("⚠️ Trading is already running.")
            return
        
        self.is_trading_active = True
        print("✅ Trading session started.")

        while self.is_trading_active:
            print("📈 Executing trades...")
            await asyncio.sleep(5)  # ✅ Simulate async trading execution
            print("✅ Trade executed successfully.")

    def stop_trading(self):
        """Stop the trading bot only when the user explicitly requests it."""
        print("🚫 User requested to stop trading.")
        trading_control.stop_trading()