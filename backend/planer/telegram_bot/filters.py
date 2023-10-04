from typing import Union
from asgiref.sync import sync_to_async

from aiogram.filters import Filter
from django.contrib.auth import get_user_model

from .models import TelegramUser


User = get_user_model()


@sync_to_async
def get_or_create_tg_user(user):
    return TelegramUser.objects.get_or_create(
            telegram_id=user.id,
            defaults={
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
        )


class IsUserFilter(Filter):
    async def __call__(self, *args, **kwargs) -> Union[bool, User]:
        user = kwargs.get("event_from_user")
        tg_model, _ = await get_or_create_tg_user(user)
        if tg_model.user:
            return True, tg_model.user

        return False
