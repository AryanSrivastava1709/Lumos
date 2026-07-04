from pydantic import BaseModel, Field
from app.schemas.movie_candidates import MovieCandidates
from typing import Optional


class ChatCreate(BaseModel):
    username: str = Field(
        min_length=3,
        max_length=30,
        pattern=r"^[a-zA-Z0-9_]+$",
    )
    message: str = Field(min_length=1, max_length=2000)


class ChatResponse(BaseModel):
    username: str
    ai_message: str
    recommended_movies: Optional[MovieCandidates] = None
