from pydantic import BaseModel, Field
from datetime import datetime
from typing import Literal


class UserCreate(BaseModel):
    username: str = Field(
        min_length=3,
        max_length=30,
        pattern=r"^[a-zA-Z0-9_]+$",
    )


class UserResponse(BaseModel):
    id: str
    username: str
    created_at: datetime
    status: Literal["created", "already_exists"]
