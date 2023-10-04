from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class TelegramUser(models.Model):
    telegram_id = models.BigIntegerField(primary_key=True)
    telegram_username = models.CharField(max_length=64)
    user = models.ForeignKey(User)
