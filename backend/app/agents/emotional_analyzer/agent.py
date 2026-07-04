from app.llm.gemini_client import client
from app.agents.emotional_analyzer.prompt import SYSTEM_PROMPT
from app.agents.emotional_analyzer.schema import EmotionalAnalysisResponse


async def analyze_emotion(message: str) -> EmotionalAnalysisResponse:

    response = await client.chat.completions.parse(
        model="gemini-3.1-flash-lite",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": message},
        ],
        response_format=EmotionalAnalysisResponse,
    )
    return response.choices[0].message.parsed
