import json
import os
import gpt3_tokenizer
import asyncio
import logging
from typing import Optional


class ThreadManager:
    def __init__(self, client):
        self.client = client

    async def list_messages(self, thread_id: str, limit: int = 20, order: str = 'desc', after: Optional[str] = None,
                            before: Optional[str] = None):
        try:
            return await self.client.beta.threads.messages.list(thread_id=thread_id,
                                                                limit=limit,
                                                                order=order,
                                                                after=after,
                                                                before=before
                                                                )
        except Exception as e:
            print(f"An error occurred while retrieving messages: {e}")
            return None

    async def retrieve_message(self, thread_id: str, message_id: str):
        return await self.client.beta.threads.messages.retrieve(thread_id=thread_id, message_id=message_id)

    async def create_thread(self, messages: Optional[list] = None, metadata: Optional[dict] = None):
        return await self.client.beta.threads.create(messages=messages, metadata=metadata)

    async def retrieve_thread(self, thread_id: str):
        return await self.client.beta.threads.retrieve(thread_id)

    async def modify_thread(self, thread_id: str, metadata: dict):
        return await self.client.beta.threads.modify(thread_id, metadata=metadata) 

    async def delete_thread(self, thread_id: str):
        return await self.client.beta.threads.delete(thread_id)

    # async def send_message(self, thread_id: str, content: str, role: str = "user"):
    #     # token_count = self.count_tokens(content)
    #     # print(f"Tokens used in message: {token_count}")
    #     return await self.client.beta.threads.messages.create(thread_id=thread_id, role=role, content=content)

    async def send_message(self, thread_id: str, content: str, role: str = "user"):
        # Wait until there are no active runs
        await self.wait_for_active_runs(thread_id)      
        
        # Now it's safe to send the message
        return await self.client.beta.threads.messages.create(thread_id=thread_id, role=role, content=content)

    # async def wait_for_active_runs(self, thread_id: str):
        # while True:
        #     runs = await self.list_runs(thread_id)
        #     active_runs = [run for run in runs.data if run.status == "active"]

        #     if not active_runs:
        #         break  # No active runs, exit the loop

        #     await asyncio.sleep(2) 
    async def wait_for_active_runs(self, thread_id: str, timeout: int = 60):
        start_time = asyncio.get_event_loop().time()
    
        while True:
        # Check elapsed time
            elapsed_time = asyncio.get_event_loop().time() - start_time
            if elapsed_time > timeout:
                logging.warning("Timeout reached while waiting for active runs to complete.")
                break
        
        # List active runs
            runs = await self.list_runs(thread_id)
            active_runs = [run for run in runs.data if run.status == "active"]

            if not active_runs:
                break  # No active runs, exit the loop

            logging.info(f"Active runs detected: {len(active_runs)}. Waiting...")
        
            await asyncio.sleep(2)  # Wait before checking again

            logging.info("No active runs found.Proceeding.")



    async def create_run(self, thread_id: str, assistant_id: str):
        return await self.client.beta.threads.runs.create(thread_id=thread_id, assistant_id=assistant_id)

    async def list_runs(self, thread_id: str):
        return await self.client.beta.threads.runs.list(thread_id=thread_id)

    @staticmethod
    def count_tokens(text: str):
        # Placeholder for the actual token counting logic
        return gpt3_tokenizer.count_tokens(text)

    @staticmethod
    def read_thread_data(filename: str = 'data.json'):
        if os.path.exists(filename):
            with open(filename, 'r') as file:
                return json.load(file)
        return {}

    @staticmethod
    def save_thread_data(thread_id: str, filename: str = 'data.json'):
        data = {'thread_id': thread_id}
        with open(filename, 'w') as file:
            json.dump(data, file)
