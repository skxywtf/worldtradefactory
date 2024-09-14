import os
import json
import gpt3_tokenizer
import asyncio
import logging
from typing import Optional
from dotenv import load_dotenv  # Import dotenv to load environment variables

# Load environment variables from .env file
load_dotenv()

class ThreadManager:
    def __init__(self, client):
        self.client = client
        self.thread_id = os.getenv('THREAD_ID')  # Get thread_id from .env file

    async def list_messages(self, THREAD_ID: str,limit: int = 20, order: str = 'desc', after: Optional[str] = None,
                            before: Optional[str] = None):
        try:
            return await self.client.beta.threads.messages.list(thread_id=THREAD_ID,
                                                                limit=limit,
                                                                order=order,
                                                                after=after,
                                                                before=before
                                                                )
        except Exception as e:
            print(f"An error occurred while retrieving messages: {e}")
            return None

    async def retrieve_message(self,THREAD_ID: str, message_id: str):
        return await self.client.beta.threads.messages.retrieve(thread_id=THREAD_ID, message_id=message_id)

    async def create_thread(self, messages: Optional[list] = None, metadata: Optional[dict] = None):
        return await self.client.beta.threads.create(messages=messages, metadata=metadata)

    async def retrieve_thread(self, THREAD_ID: str):
        return await self.client.beta.threads.retrieve(THREAD_ID)

    async def modify_thread(self,THREAD_ID: str, metadata: dict):
        return await self.client.beta.threads.modify(THREAD_ID, metadata=metadata)

    async def delete_thread(self,THREAD_ID: str):
        return await self.client.beta.threads.delete(THREAD_ID)

    async def send_message(self,THREAD_ID: str, content: str, role: str = "user"):
        # Wait until there are no active runs
        await self.wait_for_active_runs(THREAD_ID)      
        
        # Now it's safe to send the message
        return await self.client.beta.threads.messages.create(thread_id=THREAD_ID, role=role, content=content)

    async def wait_for_active_runs(self,THREAD_ID: str, timeout: int = 60):
        start_time = asyncio.get_event_loop().time()
    
        while True:
            # Check elapsed time
            elapsed_time = asyncio.get_event_loop().time() - start_time
            if elapsed_time > timeout:
                logging.warning("Timeout reached while waiting for active runs to complete.")
                break
        
            # List active runs
            runs = await self.list_runs(THREAD_ID)
            active_runs = [run for run in runs.data if run.status == "active"]

            if not active_runs:
                break  # No active runs, exit the loop

            logging.info(f"Active runs detected: {len(active_runs)}. Waiting...")
        
            await asyncio.sleep(2)  # Wait before checking again

        logging.info("No active runs found. Proceeding.")

    async def create_run(self,THREAD_ID: str, assistant_id: str):
        return await self.client.beta.threads.runs.create(thread_id=THREAD_ID, assistant_id=assistant_id)

    async def list_runs(self,THREAD_ID: str):
        return await self.client.beta.threads.runs.list(thread_id=THREAD_ID)

    @staticmethod
    def count_tokens(text: str):
        # Placeholder for the actual token counting logic
        return gpt3_tokenizer.count_tokens(text)

    @staticmethod
    def read_thread_data():
        # This method can be removed or kept if still needed for other purposes
        return {}

    @staticmethod
    def save_thread_data(ASSISTANT_ID: str, THREAD_ID: str, env_file: str = '.env'):
        # Read existing .env file content
        if os.path.exists(env_file):
            with open(env_file, 'r') as file:
                lines = file.readlines()
        else:
            lines = []

        # Filter out lines containing ASSISTANT_ID or THREAD_ID
        lines = [line for line in lines if not line.startswith('ASSISTANT_ID=') and not line.startswith('THREAD_ID=')]

        # Add the new assistant_id and thread_id
        lines.append(f'ASSISTANT_ID={ASSISTANT_ID}\n')
        lines.append(f'THREAD_ID={THREAD_ID}\n')

        # Write the updated content back to the .env file
        with open(env_file, 'w') as file:
            file.writelines(lines)
