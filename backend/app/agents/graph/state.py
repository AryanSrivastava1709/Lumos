from typing import Optional, TypedDict
from app.agents.emotional_analyzer.schema import EmotionalAnalysisResponse
from app.schemas.movie_candidates import MovieCandidates
from app.schemas.chat import ChatResponse


class ReccomendationState(TypedDict):
    username: str
    message: str
    emotions: Optional[EmotionalAnalysisResponse]
    movie_candidates: Optional[MovieCandidates]
    recommended_movies: Optional[ChatResponse]
    history: list[dict] | None
