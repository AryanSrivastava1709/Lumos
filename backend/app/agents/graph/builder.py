from langgraph.graph import START, END, StateGraph

from app.agents.graph.nodes import (
    emotion_node,
    fetch_movies_node,
    recommend_movies_node,
)
from app.agents.graph.state import ReccomendationState

builder = StateGraph(ReccomendationState)

builder.add_node("emotion", emotion_node)
builder.add_node("movie_fetch", fetch_movies_node)
builder.add_node("movie_recommend", recommend_movies_node)


builder.add_edge(START, "emotion")
builder.add_edge("emotion", "movie_fetch")
builder.add_edge("movie_fetch", "movie_recommend")
builder.add_edge("movie_recommend", END)


recommendation_graph = builder.compile()
