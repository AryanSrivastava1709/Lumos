from app.core.database import database
from app.models.user import UserModel


class UserRepository:
    collection = database["users"]

    async def get_by_username(self, username: str):
        return await self.collection.find_one({"username": username})

    async def create_user(self, user: UserModel):
        result = await self.collection.insert_one(user.model_dump())

        return await self.collection.find_one({"_id": result.inserted_id})
