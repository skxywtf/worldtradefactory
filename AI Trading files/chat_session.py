import asyncio
from thread_manager import ThreadManager
from assistant_manager import AssistantManager
import requests
import json
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
# Set up the Alpaca API client
ALPACA_API_KEY = ('PKK8X2I51Z08PE8D2TE8')
ALPACA_SECRET_KEY = ('9fWCMQsNvRUfzC2rPwPgIgAybECYQpZuJDA2eTwx')
BASE_URL = 'https://paper-api.alpaca.markets'    

api = tradeapi.REST(ALPACA_API_KEY, ALPACA_SECRET_KEY, BASE_URL, api_version='v2')

def buy_shares(stock_symbol: str, quantity: int):
    try:   
        # Submit a market order to buy the shares
        api.submit_order(
            symbol=stock_symbol,
            qty=quantity,
            side='buy',
            type='market',
            time_in_force='gtc'  # Good 'Til Canceled
        )
        return f"Successfully placed an order to buy {quantity} shares of {stock_symbol}."
    except Exception as e:
        return f"Failed to place order: {str(e)}"    

def sell_shares(symbol: str, qty: int):
    try:
        # Check if you have enough shares to sell
        position = api.get_position(symbol)
        if int(position.qty) < qty:
            return f"Error: You don't have enough shares to sell. You currently own {position.qty} shares."

        # Place a market sell order
        order = api.submit_order(
            symbol=symbol,
            qty=qty,
            side='sell',
            type='market',
            time_in_force='gtc'  # Good 'til canceled
        )
        
        return f"Sell order placed: {qty} shares of {symbol}."
    
    except Exception as e:
        return f"Error: {str(e)}"

    


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
        self.assistant_name = assistant_name
        self.model_name = model_name
        self.assistant_id = assistant_id
        self.thread_id = thread_id

    async def start_session(self):
        if self.thread_id is None:
            # Get or create a thread
            self.thread_id = await self.get_or_create_thread()

        if self.assistant_id is None:
            # Find or create an assistant
            self.assistant_id = await self.find_or_create_assistant(
                name=self.assistant_name,
                model=self.model_name
            )

        # Display existing chat history
        await self.display_chat_history()

        prev_messages = await self.thread_manager.list_messages(self.thread_id)
        if prev_messages is None:
            print("An error occurred while retrieving messages.")     
            return

        # Start the chat loop
        await self.chat_loop()   

    async def chat_loop(self):
        try:
            while True:
                user_input = input("You: ")
                if user_input.lower() in ['exit', 'quit', 'bye']:
                    break
                if user_input.lower() in ['/delete', '/clear']:
                    await self.thread_manager.delete_thread(self.thread_id)
                    self.thread_id = await self.get_or_create_thread()
                    continue

                response = await self.get_latest_response(user_input)

                if response:
                    print("Assistant:", response)

        finally:
            print(f"Session ended")

    async def get_or_create_thread(self):
        data = self.thread_manager.read_thread_data()
        thread_id = data.get('thread_id')
        if not thread_id:
            thread = await self.thread_manager.create_thread(messages=[])
            thread_id = thread.id
            self.thread_manager.save_thread_data(thread_id)
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
                },
                },},
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
                    },
                },
            },
            {"type":"function",
             "function":{
                "name": "buy_shares",
                "description": "Buy a specified number of shares of a given stock using the Alpaca API.",
                "parameters": {
                    "type": "object",
                        "properties": {
                            "stock_symbol": {
                                "type": "string",
                                "description": "The stock symbol of the company to buy shares of, e.g., AAPL for Apple."
                            },
                            "quantity": {
                                "type": "integer",
                                "description": "The number of shares to buy."
                            },
                        },  
                        "required": ["stock_symbol", "quantity"] 
                },
                
            },
          },
          {"type":"function",
            "function":{
                "name": "sell_shares",
                "description": "Sell shares of a given stock using Alpaca's API.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "symbol": {
                            "type": "string",
                            "description": "The ticker symbol of the stock to sell."
                        },
                        "qty": {
                            "type": "integer",
                            "description": "The number of shares to sell."
                        },
                    },
                    "required": ["symbol","qty"]
            },
            },       
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
            elif func_name == "buy_shares":
                    stock_symbol = arguments["stock_symbol"]
                    quantity = arguments.get("quantity")
                    output = buy_shares(stock_symbol=stock_symbol, quantity=quantity)
                    if isinstance(output, dict) and "error" in output:
                        final_str = output["error"]    
                    else:
                        final_str = output
                    tool_outputs.append({"tool_call_id": action["id"], "output": final_str}) 
                    print("data retrived successfully...")
            elif func_name == "sell_shares":
                    symbol = arguments["symbol"]
                    qty = arguments.get("qty")
                    output = sell_shares(symbol=symbol, qty=qty)
                    if isinstance(output, dict) and "error" in output:
                        final_str = output["error"]    
                    else:
                        final_str = output
                    tool_outputs.append({"tool_call_id": action["id"], "output": final_str}) 
                    print("data retrived successfully...")                   


            else:
                raise ValueError(f"Unknown function: {func_name}")

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
                        required_actions=latest_run.required_action.submit_tool_outputs.model_dump(),run = latest_run
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
                    


            

                                
 