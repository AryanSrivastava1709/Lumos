from datetime import datetime

from app.core.database import database
from app.models.conversation import Conversation, Message


class ConversationRepository:
    collection = database["conversations"]

    async def get_by_username(self, username: str):
        return await self.collection.find_one({"username": username})

    async def create_conversation(self, username: str):
        conversation = Conversation(
            chat_id=username,
            username=username,
        )

        result = await self.collection.insert_one(conversation.model_dump(mode="json"))

        return await self.collection.find_one({"_id": result.inserted_id})

    async def append_message(
        self,
        username: str,
        message: Message,
    ):
        conversation = await self.get_by_username(username)

        if conversation is None:
            await self.create_conversation(username)

        await self.collection.update_one(
            {"username": username},
            {
                "$push": {
                    "messages": message.model_dump(mode="json"),
                },
                "$set": {
                    "updated_at": datetime.utcnow(),
                },
            },
        )

    async def get_last_messages(
        self,
        username: str,
        limit: int = 10,
    ) -> list[dict]:
        conversation = await self.collection.find_one(
            {"username": username},
            {
                "_id": 0,
                "messages": {"$slice": -limit},
            },
        )

        if conversation is None:
            return []

        return conversation.get("messages", [])
