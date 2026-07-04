from pydantic import BaseModel


class MovieCandidate(BaseModel):
    id: int
    title: str
    original_title: str
    vote_average: float
    poster_path: str
    release_date: str
    original_language: str


class MovieCandidates(BaseModel):
    movies: list[MovieCandidate]
