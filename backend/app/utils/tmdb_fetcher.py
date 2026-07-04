from app.agents.emotional_analyzer.agent import analyze_emotion
from app.agents.emotional_analyzer.schema import EmotionalAnalysisResponse
from app.utils.genre_mapper import map_genre
from app.core.config import settings
import httpx
from app.schemas.movie_candidates import MovieCandidate, MovieCandidates

BASE_URL = "https://api.themoviedb.org/3"


# endpoint for fetching movies from TMDB
async def discover_movies(genre_ids: list[int], content_type: str, language: str):
    params = {
        "with_genres": ",".join(map(str, genre_ids)),
        "language": "en-US",
        "sort_by": "popularity.desc",
        "include_adult": False,
        "with_original_language": language,
        "page": 1,
    }
    headers = {
        "Authorization": f"Bearer {settings.tmdb_bearer_token}",
        "accept": "application/json",
    }
    endpoint = "movie" if content_type == "movie" else "tv"

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BASE_URL}/discover/{endpoint}",
            params=params,
            headers=headers,
        )
        response.raise_for_status()

        return response.json()


# helper function for fetching movies
async def fetchMovies(emotion: EmotionalAnalysisResponse) -> MovieCandidates:

    # map genres
    tmdb_genere_ids = map_genre(emotion.genres, emotion.content_type)

    # discover movies
    movies_canidates = await discover_movies(
        genre_ids=tmdb_genere_ids,
        content_type=emotion.content_type,
        language=emotion.language,
    )

    # convert to response
    movies = [
        MovieCandidate(
            id=item["id"],
            title=item.get("title") or item.get("name", ""),
            original_title=item.get("original_title") or item.get("original_name", ""),
            vote_average=item["vote_average"],
            poster_path=item["poster_path"] or "",
            release_date=item.get("release_date") or item.get("first_air_date", ""),
            original_language=item["original_language"],
        )
        for item in movies_canidates.get("results", [])[:10]
    ]

    return MovieCandidates(movies=movies)
