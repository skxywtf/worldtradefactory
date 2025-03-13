import os
import json
import gpt3_tokenizer
import asyncio
import logging
from typing import Optional
from dotenv import load_dotenv  # Import dotenv to load environment variables
from openai import AsyncOpenAI
# Load environment variables from .env file
load_dotenv()

class ThreadManager:
    def __init__(self, client: AsyncOpenAI):
        """Manages OpenAI Assistant threads for chat and trading."""
        self.client = client
        self.threads = {"chat": None, "trading": None}  # Stores thread IDs for different purposes


    async def list_messages(self, thread_id: str, limit: int = 20):
        """Retrieves messages from a thread."""
        try:
            return await self.client.beta.threads.messages.list(thread_id=thread_id, limit=limit)
        except Exception as e:
            print(f"ERROR: Failed to retrieve messages: {e}")
            return None

    async def retrieve_message(self,THREAD_ID: str, message_id: str):
        return await self.client.beta.threads.messages.retrieve(thread_id=THREAD_ID, message_id=message_id)

    async def create_thread(self, messages: Optional[list] = None, metadata: Optional[dict] = None):
        thread = await self.client.beta.threads.create(messages=messages, metadata=metadata)
        self.thread_ids[thread.id] = thread
        return thread
    
    async def get_or_create_thread(self, thread_type="chat"):
        """Ensures a separate thread exists for each purpose (chat & trading)."""
        if not self.threads.get(thread_type):
            try:
                thread = await self.client.beta.threads.create()
                self.threads[thread_type] = thread.id
                print(f"DEBUG: New {thread_type} thread created with ID: {thread.id}")
            except Exception as e:
                print(f"ERROR: Failed to create {thread_type} thread: {e}")
                return None
        return self.threads[thread_type]

    
    async def retrieve_thread(self, THREAD_ID: str):
        return await self.client.beta.threads.retrieve(THREAD_ID)

    async def modify_thread(self,THREAD_ID: str, metadata: dict):
        return await self.client.beta.threads.modify(THREAD_ID, metadata=metadata)

    async def delete_thread(self, thread_id: str):
        """Deletes a thread."""
        try:
            return await self.client.beta.threads.delete(thread_id=thread_id)
        except Exception as e:
            print(f"ERROR: Failed to delete thread: {e}")
            return None

    async def send_message(self, thread_id: str, content: str, role: str = "user"):
        """Sends a message to the assistant in a thread."""
        if not thread_id:
            print("ERROR: Cannot send message - thread_id is missing!")
            return None
        
        try:
            print(f"DEBUG: Sending message to thread {thread_id}: {content}")  # Debugging
            await self.wait_for_active_runs(thread_id)  # Ensure no active runs before sending
            response = await self.client.beta.threads.messages.create(thread_id=thread_id, role=role, content=content)
            print(f"DEBUG: Message sent successfully: {response}")  # Debugging
            return response
        except Exception as e:
            print(f"ERROR: Failed to send message: {e}")
            return None

    @staticmethod
    def load_thread_data(env_file: str = '.env') -> dict:
        """
        Load thread data from the environment file.
        Args:
            env_file (str): Path to the .env file.
        Returns:
            dict: Dictionary of thread IDs mapped by their purpose.
        """
        thread_data = {}
        if os.path.exists(env_file):
            with open(env_file, 'r') as file:
                for line in file:
                    if line.startswith('THREAD_ID_'):
                        parts = line.strip().split('=')
                        purpose = parts[0].split('_', 2)[2].lower()
                        thread_id = parts[1]
                        thread_data[purpose] = thread_id
        return thread_data


    async def list_threads(self):
        return list(self.thread_ids.keys())

    async def wait_for_active_runs(self, thread_id: str, timeout: int = 60):
        """Waits until all active runs in a thread are completed."""
        start_time = asyncio.get_event_loop().time()
        while True:
            elapsed_time = asyncio.get_event_loop().time() - start_time
            if elapsed_time > timeout:
                print("WARNING: Timeout reached while waiting for active runs to complete.")
                break

            runs = await self.list_runs(thread_id)
            active_runs = [run for run in runs.data if run.status == "active"]
            if not active_runs:
                break

            print(f"INFO: Waiting for {len(active_runs)} active runs to complete...")
            await asyncio.sleep(2)

    async def create_run(self,THREAD_ID: str, assistant_id: str):
        return await self.client.beta.threads.runs.create(thread_id=THREAD_ID, assistant_id=assistant_id)

    async def list_runs(self, thread_id: str):
        """Lists all runs in a thread."""
        try:
            return await self.client.beta.threads.runs.list(thread_id=thread_id)
        except Exception as e:
            print(f"ERROR: Failed to list runs: {e}")
            return None
        
    @staticmethod
    def count_tokens(text: str):
        # Placeholder for the actual token counting logic
        return gpt3_tokenizer.count_tokens(text)

    @staticmethod
    def read_thread_data():
        # This method can be removed or kept if still needed for other purposes
        return {}

    @staticmethod
    def save_thread_data(self, env_file: str = '.env'):
        # Read existing .env file content

        if not hasattr(self, 'thread_ids') or not isinstance(self.thread_ids, dict):
            self.thread_ids = {}
            return
        thread_data = {"thread_ids": self.thread_ids}

        if os.path.exists(env_file):
            with open(env_file, 'r') as file:
                lines = file.readlines()
        else:
            lines = []
        lines = [line for line in lines if not line.startswith('THREAD_ID_')]

        # Add new thread IDs
        for purpose, thread_id in self.thread_ids.items():
            lines.append(f'THREAD_ID_{purpose.upper()}={thread_id}\n')
        # Filter out lines containing ASSISTANT_ID or THREAD_ID
            lines = [line for line in lines if not line.startswith('ASSISTANT_ID=') and not line.startswith('THREAD_ID=')]
        with open(env_file, 'w') as file:
            file.writelines(lines)