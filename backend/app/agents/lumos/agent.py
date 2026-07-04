import re

from app.llm.gemini_client import client

from app.agents.lumos.prompt import SYSTEM_PROMPT
from app.schemas.chat import ChatResponse
from app.schemas.movie_candidates import MovieCandidates

GREETING_PATTERNS = [
    r"hi+",
    r"hello+",
    r"hey+",
    r"good morning",
    r"good afternoon",
    r"good evening",
    r"how are you",
    r"who are you",
    r"what's up",
    r"whats up",
    r"can you help me",
    r"thanks",
    r"thank you",
]


def is_general_chat(message: str) -> bool:
    text = message.strip().lower()

    for pattern in GREETING_PATTERNS:
        if re.fullmatch(pattern, text):
            return True

    return False


async def recommend_movies(
    message: str,
    movies: MovieCandidates,
    username: str,
    history: list[dict],
) -> ChatResponse:

    # Handle greetings without calling the LLM
    if is_general_chat(message):
        return ChatResponse(
            username=username,
            ai_message=(
                f"Hello {username}! 👋 I'm Lumos, your AI movie and TV companion. "
                "Tell me how you're feeling today or what kind of movie or TV show you're in the mood for, "
                "and I'll help you discover something you'll love."
            ),
            recommended_movies=None,
        )

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

    for msg in history:
        messages.append(
            {
                "role": msg["role"],
                "content": msg["content"],
            }
        )

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
