from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api import health
from app.api import user
from app.api import chat
from app.core.config import settings
from app.core.database import client


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Connecting to MongoDB...")

    try:
        # Ping the database to verify the connection
        await client.admin.command("ping")
        print("✅ MongoDB Connected Successfully")
    except Exception as e:
        print(f"❌ MongoDB Connection Failed: {e}")

    yield

    # Shutdown
    print("🔌 Closing MongoDB Connection...")
    client.close()
    print("✅ MongoDB Connection Closed")


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description=settings.app_description,
    lifespan=lifespan,
)

# Routers
app.include_router(health.router)
app.include_router(user.router)
app.include_router(chat.router)
