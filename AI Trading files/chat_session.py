import asyncio
from thread_manager import ThreadManager
from assistant_manager import AssistantManager
import requests
import json
import time
import datetime
import pandas as pd    
import yfinance as yf
from scipy.stats import skew
import quantstats as qs
from scipy.stats import skew         
import mplfinance as mpf
from mplfinance.original_flavor import candlestick_ohlc  
import matplotlib.ticker as mticker
import pandas as pd
import matplotlib.pyplot as plt
import alpaca_trade_api as tradeapi
import os
import logging
import threading 
from dotenv import load_dotenv
import json
# Set up the Alpaca API client
ALPACA_API_KEY= os.getenv('ALPACA_API_KEY')
ALPACA_SECRET_KEY = os.getenv('ALPACA_SECRET_KEY')
ASSISTANT_ID= os.getenv('ASSISTANT_ID')
thread_id = os.getenv('THREAD_ID')
BASE_URL = 'https://paper-api.alpaca.markets'
api = tradeapi.REST(ALPACA_API_KEY, ALPACA_SECRET_KEY, BASE_URL, api_version='v2')

logging.basicConfig(level=logging.ERROR)
# Global stop flag for trading
stop_flag = False

def stop_trading():
    global stop_flag
    stop_flag = True
    print("Trading has been stopped.")

def place_order(api, stock_symbol, quantity, side='buy', order_type='market', limit_price=None, stop_price=None):
    """Place a stock order"""
    try:
        # Validate required prices based on order type
        if order_type == 'limit' and limit_price is None:
            raise ValueError("Limit orders require a limit price.")
        elif order_type == 'stop' and stop_price is None:
            raise ValueError("Stop orders require a stop price.")
        elif order_type == 'stop_limit' and (limit_price is None or stop_price is None):
            raise ValueError("Stop-limit orders require both a stop price and a limit price.")

        # Submit the stock order to Alpaca API
        order = api.submit_order(
            symbol=stock_symbol,
            qty=quantity,
            side=side,
            type=order_type,
            time_in_force='gtc',  # Good till canceled
            limit_price=limit_price if order_type in ['limit', 'stop_limit'] else None,
            stop_price=stop_price if order_type in ['stop', 'stop_limit'] else None
        )

        # Get order details for logging
        order_info = {
            "symbol": order.symbol,
            "quantity": order.qty,
            "order_type": order.type,
            "status": order.status,
            "submitted_at": order.submitted_at.isoformat() if order.submitted_at else None
        }

        print(f"Order placed: {quantity} shares of {stock_symbol} as a {order_type} order")
        return order_info

    except Exception as e:
        print(f"Error placing stock order: {str(e)}")
        return f"Error placing stock order: {str(e)}"


def place_crypto_order(api, crypto_symbol, quantity, side, order_type='market', limit_price=None):
    """Place a cryptocurrency order"""
    try:
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

def start_trading(api, symbol, qty, side='buy', order_type='market', interval_minutes=1, duration_minutes=10, is_crypto=False):
    """Start trading stocks or cryptocurrency"""
    global stop_flag
    stop_flag = False  # Reset stop flag when starting trading

    interval_seconds = interval_minutes * 60
    end_time = datetime.datetime.now() + datetime.timedelta(minutes=duration_minutes)

    # Trading loop
    while not stop_flag and datetime.datetime.now() < end_time:
        current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"Running trading logic at {current_time}")

        # Place either a stock or a cryptocurrency order based on the is_crypto flag
        if is_crypto:
            place_crypto_order(api, symbol, qty, side, order_type)
        else:
            place_order(api, symbol, qty, side, order_type)

        # Sleep for the specified interval
        time.sleep(interval_seconds)

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
            avg_entry_price = float(position.avg_entry_price)  # Ensure price is float

            # Multiply to get the value of that particular stock holding
            stock_value = qty * avg_entry_price
            portfolio_value += stock_value

            portfolio_details.append({
                'symbol': symbol,
                'quantity': qty,
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
                "quantity": order.qty,
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


def calculate_metric(data, metric):                     
    results = {}
    
    if metric == 'daily_returns':     
        data['Daily Return'] = data['Adj Close'].pct_change()
        daily_returns = data['Daily Return'].dropna()
        results['average_daily_return'] = round(daily_returns.mean() * 100, 2)
    
    elif metric == 'standard_deviation':
        results['standard_deviation'] = round(data['Adj Close'].pct_change().std() * 100, 2)
    
    elif metric == 'skewness':
        results['skewness'] = round(skew(data['Adj Close'].pct_change().dropna()), 2)
    elif metric == 'kurtosis':
        # Calculate kurtosis using quantstats
        results['kurtosis'] = round(qs.stats.kurtosis(data['Adj Close'].pct_change().dropna()), 2)
    elif metric == 'cumulative_returns':
        # Calculate cumulative returns using quantstats
        cumulative_returns = qs.stats.cumulative_returns(data['Adj Close'])
        results['cumulative_returns'] = round(cumulative_returns[-1] * 100, 2)
    
    elif metric == 'sharpe_ratio':
        # Calculate Sharpe ratio using quantstats
        sharpe_ratio = qs.stats.sharpe(data['Adj Close'])
        results['sharpe_ratio'] = round(sharpe_ratio, 2)            
       
    
    return results

def get_financial_metric(company_name, metric,start_year,end_year):      
    print("In the function....")    
    # Convert company name to symbol
    company_symbol = company_name_to_symbol(company_name)
    try:
        start_date = pd.to_datetime(f"{start_year}-01-01")
        end_date = pd.to_datetime(f"{end_year}-12-31")
    except ValueError:
        return {"error": "Invalid year format. Please provide valid years."}
    
    try:
        stock_data = yf.download(company_symbol, period='1y', interval='1d')
        
        if stock_data.empty:
            return {"error": "No data found for the given symbol."}
        
        result = calculate_metric(stock_data, metric)
        
        if not result:
            return {"error": "Invalid metric provided or data unavailable."}
        
        formatted_result = "\n".join(
            f"{key.replace('_', ' ').title()}: {value}"
            for key, value in result.items()
        )
        
        return formatted_result
    
    except Exception as e:
        return {"error": f"Error occurred: {str(e)}"}

def company_name_to_symbol(company_name):
    # Example mapping for company names to symbols
    company_mapping = {
        "apple": "AAPL",
        "microsoft": "MSFT",
        "google": "GOOGL",
        "amazon": "AMZN",
        "tesla" : "TSLA",    
        # Add more mappings as needed
    }
    return company_mapping.get(company_name.lower(), "Unknown")

def get_news(topic):
    news_api_key = "09f0bf58f68445b79006faa012009b95"
    url = (
        f"https://newsapi.org/v2/everything?q={topic}&apiKey={news_api_key}&pageSize=5"
    )

    try:
        response = requests.get(url)
        print(response.status_code)
        if response.status_code == 200:
            news = json.dumps(response.json(), indent=4)
            news_json = json.loads(news)

            data = news_json

            # Access all the fiels == loop through
            status = data["status"]
            total_results = data["totalResults"]
            articles = data["articles"]
            final_news = []

            # Loop through articles
            for article in articles:
                source_name = article["source"]["name"]
                author = article["author"]
                title = article["title"]
                description = article["description"]
                url = article["url"]
                content = article["content"]
                title_description = f"""
                   Title: {title}, 
                   Author: {author},
                   Source: {source_name},
                   Description: {description},
                   URL: {url}
            
                """
                final_news.append(title_description)
            print(final_news)
            return final_news
        else:
            return []

    except requests.exceptions.RequestException as e:
        print("Error occured during API Request", e)


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

                # Handle trading commands
                if self.is_trading_command(user_input):
                    params = self.parse_trading_params(user_input)
                    self.trading_bot_params = params
                    print(f"\nStarting trading bot for {params['symbol']}...")
                    if self.trading_bot_thread is None or not self.trading_bot_thread.is_alive():
                        self.trading_bot_thread = self.start_background_thread(self.trading_bot_manager)
                    continue

                # Get and display assistant response
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

    def parse_trading_params(self, input_text):
        """Parse trading parameters from user input"""
        # Basic parsing logic - can be enhanced based on needs
        words = input_text.lower().split()
        
        params = {
            'symbol': 'MSFT',  # Default symbol
            'quantity': 1,     # Default quantity
            'side': 'buy' if 'buy' in words else 'sell',
            'interval_minutes': 1,
            'duration_minutes': 5
        }

        # Parse symbol if provided
        for symbol in ['msft', 'aapl', 'meta', 'googl', 'amzn']:
            if symbol in words:
                params['symbol'] = symbol.upper()
                break

        # Parse quantity if provided
        for i, word in enumerate(words):
            if word.isdigit():
                params['quantity'] = int(word)
                break

        return params

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
                qty=params['quantity'],
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
                            "stock_symbol": {
                                "type": "string",
                                "description": "The stock symbol of the company to buy shares of, e.g., AAPL for Apple."
                            },
                            "quantity": {
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
                        "required": ["stock_symbol", "quantity","side"]
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
                            "quantity": {
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
                        "required": ["symbol", "quantity", "side"]
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
        # Send the user message
        await self.send_message(user_input)

        # Create a new run for the assistant to respond
        await self.create_run()

        # Wait for the assistant's response
        await self.wait_for_assistant()

        # Retrieve the latest response
        return await self.retrieve_latest_response()  

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
                    final_str += "".join(item)   

                tool_outputs.append({"tool_call_id": action["id"], "output": final_str}) 
            elif func_name == "get_financial_metric":
                    company_name = arguments["company_name"]
                    metric = arguments["metric"]
                    start_year = arguments.get("start_year")
                    end_year = arguments.get("end_year")
                    output = get_financial_metric(company_name=company_name, metric=metric,start_year=start_year,end_year=end_year)
                    if isinstance(output, dict) and "error" in output:
                        final_str = output["error"]    
                    else:
                        final_str = output
                    tool_outputs.append({"tool_call_id": action["id"], "output": final_str}) 
                    print("data retrived successfully...")     

            elif func_name == "place_order":
                # Extract the required parameters from the user's input
                stock_symbol = arguments.get("stock_symbol")
                quantity = arguments.get("quantity")
                side = arguments.get("side")  # Required to determine if it's a buy or sell order

                # Optional parameters
                order_type = arguments.get("order_type", "market")  # Default to market if not provided
                limit_price = arguments.get("limit_price")  # Only required for limit or stop-limit orders
                stop_price = arguments.get("stop_price")  # Only required for stop or stop-limit orders

                try:
                    # Call the function to place the stock order with extracted arguments
                    output = place_order(
                        api=api,  # Ensure API instance is passed here
                        stock_symbol=stock_symbol,
                        side=side,  # Pass the side (buy/sell)
                        quantity=quantity,
                        order_type=order_type,
                        limit_price=limit_price,
                        stop_price=stop_price
                    )

                    # Append the result for the tool call
                    tool_outputs.append({"tool_call_id": action["id"], "output": json.dumps(output)})
                    print("Stock order processed successfully...")

                except Exception as e:
                    tool_outputs.append({"tool_call_id": action["id"], "output": str(e)})
                    print(f"Error processing stock order: {e}")


            elif func_name == "start_trading":
                # Log arguments for debugging
                print("Arguments received:", arguments)

                stock_symbol = arguments.get("symbol")
                quantity = arguments.get("quantity")
                side = arguments.get("side")
                order_type = arguments.get("order_type", 'market')
                interval_minutes = arguments.get("interval_minutes", 1)
                duration_minutes = arguments.get("duration_minutes", 10)

                try:
                    # Call the start_trading function with the correct parameters
                    output = start_trading(
                        api=api,
                        symbol=stock_symbol,
                        qty=quantity,
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
                    stock_symbol = arguments["symbol"]

                    try:
                        # Call the get_latest_price function
                        output = get_latest_price(stock_symbol)
                        final_str = f"Latest price of {stock_symbol}: {output}"
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
                        stop_trading()
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
        while True:
            runs = await self.thread_manager.list_runs(self.thread_id)
            latest_run = runs.data[0]
            if latest_run.status in ["completed", "failed"]:
                break
            elif latest_run.status == "requires_action":
                await self.call_required_functions(
                    required_actions=latest_run.required_action.submit_tool_outputs.model_dump(), run=latest_run
                )

            await asyncio.sleep(2)  # Wait for 2 seconds before checking again

    async def retrieve_latest_response(self):
        response = await self.thread_manager.list_messages(self.thread_id)
        for message in response.data:
            if message.role == "assistant":
                if message.content[0].type=='text':
                    return message.content[0].text.value    
                       
                elif message.content[0].type == 'image_file':
                      print(f"Image File ID: {message.content[0].image_file.file_id}") 
                      image_data = await self.assistant_manager.client.files.content(message.content[0].image_file.file_id)
                      image_data_bytes =  image_data.read()      

                      with open(f"{message.content[0].image_file.file_id}.png", "wb") as file:    
                    #   with open(f"{message.content[0].image_file.file_id}.png", "wb") as file:              
            
                        file.write(image_data_bytes)   
                        return f"Image saved as {message.content[0].image_file.file_id}.png"