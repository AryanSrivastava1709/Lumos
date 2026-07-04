from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings

client = AsyncIOMotorClient(settings.mongodb_uri)

database: AsyncIOMotorDatabase = client[settings.database_name]
