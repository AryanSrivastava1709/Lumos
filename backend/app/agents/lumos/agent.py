from app.llm.gemini_client import client

from app.agents.lumos.prompt import SYSTEM_PROMPT
from app.schemas.chat import ChatResponse
from app.schemas.movie_candidates import MovieCandidates


async def recommend_movies(
    message: str,
    movies: MovieCandidates,
    username: str,
    history: list[dict],
) -> ChatResponse:
    user_prompt = f"""
Username:
{username}

User Message:
{message}

Candidate Movies:
{movies.model_dump_json(indent=2)}
"""

    messages = [
        {
            "role": "system",
            "content": SYSTEM_PROMPT,
        }
    ]

    # Previous conversation
    for msg in history:
        messages.append(
            {
                "role": msg["role"],
                "content": msg["content"],
            }
        )

    # Current request
    messages.append(
        {
            "role": "user",
            "content": user_prompt,
        }
    )

    response = await client.chat.completions.parse(
        model="gemini-3.1-flash-lite",
        messages=messages,
        response_format=ChatResponse,
    )

    return response.choices[0].message.parsed
