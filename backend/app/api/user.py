from fastapi import APIRouter
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserResponse
from app.schemas.user import UserCreate
from app.models.user import UserModel

router = APIRouter(prefix="/users", tags=["Users"])


repo = UserRepository()


@router.post("", response_model=UserResponse, summary="Login or Create user")
async def login_or_create_user(user: UserCreate):

    existing_user = await repo.get_by_username(user.username)

    if existing_user:
        return UserResponse(
            id=str(existing_user["_id"]),
            username=existing_user["username"],
            created_at=existing_user["created_at"],
            status="already_exists",
        )

    new_user = UserModel(username=user.username)

    created_user = await repo.create_user(new_user)

    return UserResponse(
        id=str(created_user["_id"]),
        username=created_user["username"],
        created_at=created_user["created_at"],
        status="created",
    )
