import asyncio
import os
from dotenv import load_dotenv
from openai import AsyncOpenAI
from thread_manager import ThreadManager
from assistant_manager import AssistantManager
from chat_session import ChatSession, TradingSession

# Load API credentials
load_dotenv()
API_KEY = os.getenv("API_KEY")
ASSISTANT_NAME = os.getenv("ASSISTANT_NAME", "Devdoot")
ASSISTANT_ID = os.getenv("ASSISTANT_ID")
MODEL_NAME = os.getenv("MODEL_NAME")

async def greet_user():
    """Prints assistant greeting once at startup."""
    print("\n🤖 Devdoot: Hello! How can I assist you today?")

async def main():
    """Main function to initialize and run the assistant."""
    openai_client = AsyncOpenAI(api_key=API_KEY)
    thread_manager = ThreadManager(openai_client)
    assistant_manager = AssistantManager(openai_client)

    chat_thread_id = await thread_manager.get_or_create_thread("chat")
    trading_thread_id = await thread_manager.get_or_create_thread("trading")

    chat_session = ChatSession(thread_manager, assistant_manager, ASSISTANT_NAME, MODEL_NAME, ASSISTANT_ID, chat_thread_id)
    trading_session = TradingSession(thread_manager, assistant_manager, trading_thread_id)

    await greet_user()  # ✅ Display greeting once

    while True:
        user_input = input("\nYou: ").strip().lower()

        if user_input.lower() in ["exit", "quit"]:
            print("Exiting assistant. Goodbye!")
            break
        response = await chat_session.process_user_input(user_input)
        print(f"\nDevdoot: {response}")

if __name__ == "__main__":
    asyncio.run(main())
