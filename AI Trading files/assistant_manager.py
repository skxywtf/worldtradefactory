from typing import Optional
import json
import asyncio
import os
from openai import AsyncOpenAI

class AssistantManager:
    def __init__(self, client):
        self.client = client

    async def get_latest_response(self, user_input):
        """Sends user input to OpenAI Assistant and retrieves the response."""
        try:
            response = await self.client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": user_input}]
            )

            if not response or not response.choices:
                print("ERROR: OpenAI returned an empty response.")
                return "Error: Assistant did not generate a response."

            print(f"DEBUG: OpenAI API Response: {response.choices[0].message.content}")
            return response.choices[0].message.content
        except Exception as e:
            print(f"ERROR: Failed to get assistant response: {e}")
            return "Sorry, an error occurred."

    async def auto_resolve_symbol(self, user_input):
        """Calls OpenAI Assistant function to convert natural language into a stock symbol."""

        print(f"DEBUG: Resolving symbol for: {user_input}")  # Debugging

        try:
            response = await self.client.chat.completions.create(
                model="gpt-4-turbo",
                messages=[
                    {"role": "system", "content": "Convert natural language stock names into ticker symbols. "
                                                "For example, 'Apple' → 'AAPL', 'Tesla' → 'TSLA'."},
                    {"role": "user", "content": user_input}
                ],
                functions=[
                    {
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
                ],
                function_call="auto"  # ✅ Ensures OpenAI decides when to use function_call
            )

            # Debugging: Print full API response
            print(f"DEBUG: OpenAI API Response: {response}")

            # ✅ Case 1: Function call response
            if response.choices and response.choices[0].message.function_call:
                function_call = response.choices[0].message.function_call
                if function_call.name == "auto_resolve_symbol":
                    result = json.loads(function_call.arguments).get("user_input", "").strip().upper()
                    print(f"DEBUG: Resolved Symbol (Function Call): {result}")  # Debugging
                    return result if result else None

            # ✅ Case 2: Direct message response (when OpenAI assumes symbol is valid)
            if response.choices and response.choices[0].message.content:
                direct_response = response.choices[0].message.content.strip().upper()
                if direct_response and len(direct_response) <= 5:  # Stock symbols are usually 1-5 letters
                    print(f"DEBUG: Resolved Symbol (Direct Response): {direct_response}")  # Debugging
                    return direct_response

            print("ERROR: OpenAI API did not return a valid symbol.")
            return None  # Return None if API fails

        except Exception as e:
            print(f"ERROR: Failed to resolve stock symbol: {e}")
            return None



    async def list_assistants(self):
        response = await self.client.beta.assistants.list()
        return {assistant.name: assistant.id for assistant in response.data}

    async def retrieve_assistant(self, assistant_id: str):
        return await self.client.beta.assistants.retrieve(assistant_id)

    async def create_assistant(self, name: str, instructions: str, tools: list, model: str):
        return await self.client.beta.assistants.create(
            name="Devdoot",
            instructions=instructions,
            tools=tools,
            model=model
        )

    async def update_assistant(self, assistant_id: str, name: str, description: Optional[str] = None,
                               instructions: Optional[str] = None, tools: Optional[list] = None):
        update_fields = {}
        if name is not None:
            update_fields['name'] = "Devdoot"
        if description is not None:
            update_fields['description'] = description
        if instructions is not None:
            update_fields['instructions'] = instructions
        if tools is not None:
            update_fields['tools'] = tools
        return await self.client.beta.assistants.update(assistant_id, **update_fields)

    async def delete_assistant(self, assistant_id: str):
        return await self.client.beta.assistants.delete(assistant_id)

    async def create_assistant_file(self, assistant_id: str, file_id: str):
        return await self.client.beta.assistants.files.create(assistant_id=assistant_id, file_id=file_id)

    async def delete_assistant_file(self, assistant_id: str, file_id: str):
        return await self.client.beta.assistants.files.delete(assistant_id, file_id)

    async def list_assistant_files(self, assistant_id: str):
        return await self.client.beta.assistants.files.list(assistant_id)

    async def get_assistant_id_by_name(self, name: str):
        """
        Get the ID of an assistant by its name.

        Args:
            name (str): The name of the assistant.

        Returns:
            str: The ID of the assistant if found, otherwise None.
        """
        assistants = await self.list_assistants()
        return assistants.get(name)
