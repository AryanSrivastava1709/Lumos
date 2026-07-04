from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str
    app_version: str
    app_description: str

    debug: bool

    mongodb_uri: str
    database_name: str

    gemini_api_key: str
    tmdb_bearer_token: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
