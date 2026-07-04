from fastapi import APIRouter

from app.agents.graph.builder import recommendation_graph
from app.models.conversation import Message
from app.repositories.conversation_repository import ConversationRepository
from app.schemas.chat import ChatCreate, ChatResponse

router = APIRouter()

conversation_repository = ConversationRepository()


@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(chat_request: ChatCreate):

    # Fetch last 10 messages
    history = await conversation_repository.get_last_messages(chat_request.username)

    # Invoke LangGraph
    result = await recommendation_graph.ainvoke(
        {
            "username": chat_request.username,
            "message": chat_request.message,
            "history": history,
            "emotion": None,
            "movie_candidates": None,
            "recommended_movies": None,
        }
    )

    # Store user message
    await conversation_repository.append_message(
        chat_request.username,
        Message(
            role="user",
            content=chat_request.message,
        ),
    )

    # Store assistant response
    await conversation_repository.append_message(
        chat_request.username,
        Message(
            role="assistant",
            content=result["recommended_movies"].ai_message,
            recommended_titles=[
                movie.title
                for movie in result["recommended_movies"].recommended_movies.movies
            ],
        ),
    )

    return result["recommended_movies"]
