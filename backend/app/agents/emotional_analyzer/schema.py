from enum import Enum
from typing import Literal, Union

from pydantic import BaseModel


class MovieGenre(str, Enum):
    ACTION = "Action"
    ADVENTURE = "Adventure"
    ANIMATION = "Animation"
    COMEDY = "Comedy"
    CRIME = "Crime"
    DOCUMENTARY = "Documentary"
    DRAMA = "Drama"
    FAMILY = "Family"
    FANTASY = "Fantasy"
    HISTORY = "History"
    HORROR = "Horror"
    MUSIC = "Music"
    MYSTERY = "Mystery"
    ROMANCE = "Romance"
    SCIENCE_FICTION = "Science Fiction"
    TV_MOVIE = "TV Movie"
    THRILLER = "Thriller"
    WAR = "War"
    WESTERN = "Western"


class TVGenre(str, Enum):
    ACTION_ADVENTURE = "Action & Adventure"
    ANIMATION = "Animation"
    COMEDY = "Comedy"
    CRIME = "Crime"
    DOCUMENTARY = "Documentary"
    DRAMA = "Drama"
    FAMILY = "Family"
    KIDS = "Kids"
    MYSTERY = "Mystery"
    NEWS = "News"
    REALITY = "Reality"
    SCIFI_FANTASY = "Sci-Fi & Fantasy"
    SOAP = "Soap"
    TALK = "Talk"
    WAR_POLITICS = "War & Politics"
    WESTERN = "Western"


class EmotionalAnalysisResponse(BaseModel):
    emotion: str
    desired_emotion: str

    language: str

    content_type: Literal["movie", "series", "either"]

    genres: list[Union[MovieGenre, TVGenre]]
