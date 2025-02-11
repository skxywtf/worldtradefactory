import os
from dotenv import load_dotenv   
import openai
import requests
import json

import time
import logging
from datetime import datetime    
# import streamlit as st
#chatsession

load_dotenv()

client = openai.OpenAI()
file = client.files.create(
  file=open("trade.csv", "rb"),         
  purpose='assistants'
)
image_file = client.files.create(
    file=open("data.csv", "rb"),                   
    purpose='assistants'
)

# Optionally, you can print or store the file IDs if needed
print(f"CSV File ID: {file.id}")  
print(f"Image File ID: {image_file.id}")



model = "gpt-4o"

# # Step 1. Upload a file to OpenaI embeddings ===
# filepath = "./cryptocurrency.pdf"
# file_streams = [open(filepath, "rb")]

# # Create a vector store caled "Financial Statements"
# vector_store = client.beta.vector_stores.create(name="CryptoCurrency Information")

# file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
#   vector_store_id=vector_store.id, files=file_streams
# )

filepaths = ["./cryptocurrency.pdf", "./witw.pdf"]
file_streams = [open(filepath, "rb") for filepath in filepaths]

# Assuming the vector store is already created
vector_store = client.beta.vector_stores.create(name="Stocks Information")
vector_store_id = vector_store.id

# Upload the new batch of files to the existing vector store
file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
    vector_store_id=vector_store_id, files=file_streams
)  


# You can print the status and the file counts of the batch to see the result of this operation.
print(file_batch.status)
print(file_batch.file_counts)

# Step 2 - Create an assistant 
assistant = client.beta.assistants.create(
    name="Devdoot",
    instructions="""You are a helpful study assistant who knows a lot about understanding research papers.
    Your role is to summarize papers, clarify terminology within context, and extract key figures and data.
    Cross-reference information for additional insights and answer related questions comprehensively.
    Analyze the papers, noting strengths and limitations. You know how to take a list of article's titles and descriptions and use them to get deeper understanding and give out accurate and comprehensive responses.
    Respond to queries effectively, incorporating feedback to enhance your accuracy.
    Handle data securely and update your knowledge base with the latest research.
    Adhere to ethical standards, respect intellectual property, and provide users with guidance on any limitations.
    Maintain a feedback loop for continuous improvement and user support.
    Your ultimate goal is to facilitate a deeper understanding of complex scientific material, making it more accessible and comprehensible.And you are also a Stock Chart Maker specialized in generating graphs from CSV files containing stock price history.
    It helps users upload their data, analyzes it, and creates accurate charts. While focusing on data accuracy and clear instructions,
    it also explains the generated graphs. The GPT will not provide financial advice and will prioritize user data accuracy.
    If a request is unclear or data is incomplete, it will ask for more information. The communication style is conversational,
    making it user-friendly and approachable for a wide range of users.  Normally the mpl_finance module would be used; however,
    it is not available.  Create a custom candlestick chart using basic matplotlib functionalities only.
    """,
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
                            "description": "The topic for the news, e.g. bitcoin",
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
    tool_resources={
    "code_interpreter": {
      "file_ids": [file.id, image_file.id]              
    }
  }          
)

assistant = client.beta.assistants.update(
  assistant_id=assistant.id,
  tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}},
)

# === Get the Assis ID ===
assis_id = assistant.id
print(assis_id)


# == Step 3. Create a Thread

thread = client.beta.threads.create()
thread_id = thread.id
print(thread_id)

# # == Hardcoded ids to be used once the first code run is done and the assistant was created
# assis_id = "asst_dMnnWRgC7k81opPNxLt7vH5I"
# thread_id = "thread_CRLCFmnVPNbQaMHyu1RfJbSj"

# message = "What is mining? answer according to the resourses you are trained for!"
# message = client.beta.threads.messages.create(
#     thread_id=thread_id, role="user", content=message
# )

# == Run the Assistant
run = client.beta.threads.runs.create(
    thread_id=thread_id,
    assistant_id=assis_id,
    instructions="Please address the user as Bruce",
)


def wait_for_run_completion(client, thread_id, run_id, sleep_interval=5):
    """
    Waits for a run to complete and prints the elapsed time.:param client: The OpenAI client object.
    :param thread_id: The ID of the thread.
    :param run_id: The ID of the run.
    :param sleep_interval: Time in seconds to wait between checks.
    """
    while True:
        try:
            run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run_id)
            if run.completed_at:
                elapsed_time = run.completed_at - run.created_at
                formatted_elapsed_time = time.strftime(
                    "%H:%M:%S", time.gmtime(elapsed_time)
                )
                print(f"Run completed in {formatted_elapsed_time}")
                logging.info(f"Run completed in {formatted_elapsed_time}")
                # Get messages here once Run is completed!
                messages = client.beta.threads.messages.list(thread_id=thread_id)
                last_message = messages.data[0]
                response = last_message.content[0].text.value
                print(f"Assistant Response: {response}")
                break
        except Exception as e:
            logging.error(f"An error occurred while retrieving the run: {e}")
            break
        logging.info("Waiting for run to complete...")
        time.sleep(sleep_interval)

# Path to your .env file
env_file = '.env'

# Function to update .env file
def update_env_file(assistant_id: str, thread_id: str, env_file: str = '.env'):
    # Read existing .env file content
    if os.path.exists(env_file):
        with open(env_file, 'r') as file:
            lines = file.readlines()
    else:
        lines = []

    # Filter out lines containing ASSISTANT_ID or THREAD_ID
    lines = [line for line in lines if not line.startswith('ASSISTANT_ID=') and not line.startswith('THREAD_ID=')]

    # Add the new assistant_id and thread_id
    lines.append(f'ASSISTANT_ID={assistant_id}\n')
    lines.append(f'THREAD_ID={thread_id}\n')

    # Write the updated content back to the .env file
    with open(env_file, 'w') as file:
        file.writelines(lines)


update_env_file(assis_id, thread_id)

print(f"Added ASSISTANT_ID and THREAD_ID to {env_file}")

 
# == Run it
wait_for_run_completion(client=client, thread_id=thread_id, run_id=run.id)
 
# === Check the Run Steps - LOGS ===
run_steps = client.beta.threads.runs.steps.list(thread_id=thread_id, run_id=run.id)
print(f"Run Steps --> {run_steps.data[0]}")