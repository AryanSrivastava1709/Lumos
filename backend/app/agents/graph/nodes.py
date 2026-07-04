from app.agents.graph.state import ReccomendationState
from app.agents.emotional_analyzer.agent import analyze_emotion
from app.utils.tmdb_fetcher import fetchMovies
from app.agents.lumos.agent import recommend_movies


async def emotion_node(state: ReccomendationState) -> ReccomendationState:
    emotion = await analyze_emotion(state.get("message"))

    return {**state, "emotions": emotion}


async def fetch_movies_node(state: ReccomendationState) -> ReccomendationState:
    movies_canidates = await fetchMovies(state.get("emotions"))

    return {**state, "movie_candidates": movies_canidates}


async def recommend_movies_node(state: ReccomendationState) -> ReccomendationState:
    movies = await recommend_movies(
        state.get("message"),
        state.get("movie_candidates"),
        state.get("username"),
        state.get("history"),
    )

    return {**state, "recommended_movies": movies}
