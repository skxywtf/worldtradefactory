import os
from dotenv import load_dotenv   
import openai
import requests
import json

import time
import logging
from datetime import datetime    
# import streamlit as st


load_dotenv()

client = openai.OpenAI()
file = client.files.create(
  file=open("data.csv", "rb"),         
  purpose='assistants'
)
image_file = client.files.create(
    file=open("MSFT.csv", "rb"),                   
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
    name="Finance Educator",
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
            {"type":"function",
             "function":{
                "name": "buy_shares",
                "description": "Buy a specified number of shares of a given stock symbol or stock name using the Alpaca API.",
                "parameters": {
                    "type": "object",
                        "properties": {
                            "stock_symbol": {
                                "type": "string",
                                "description": "The stock symbol of the company to buy shares of, E.g., AAPL for Apple."
                            },
                            "stock_name":{
                                "type": "string",
                                "description":"The stock name of the symbol to buy shares of, E.g., Apple for AAPL"
                            },
                            "quantity": {
                                "type": "integer",
                                "description": "The number of shares to buy."
                            },
                        }, 
                        "required": ["stock_symbol"or"stock_name", "quantity"]  
                },
                

            },
          },
          {"type":"function",
            "function":{
                "name": "sell_shares",
                "description": "Sell shares of a given stock symbol or stock name using Alpaca's API.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "symbol": {
                            "type": "string",
                            "description": "The ticker symbol of the stock to sell."
                        },
                        "name":{
                                "type": "string",
                                "description":"The stock name of the symbol to buy shares of, E.g., Apple for AAPL"
                            },
                        "qty": {
                            "type": "integer",
                            "description": "The number of shares to sell."
                        },
                    },
                    "required": ["symbol"or"name","qty"]
            },
            },       
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

 
# == Run it
wait_for_run_completion(client=client, thread_id=thread_id, run_id=run.id)
 
# === Check the Run Steps - LOGS ===
run_steps = client.beta.threads.runs.steps.list(thread_id=thread_id, run_id=run.id)
print(f"Run Steps --> {run_steps.data[0]}")