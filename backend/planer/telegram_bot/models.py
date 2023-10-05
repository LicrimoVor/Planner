from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class TelegramUser(models.Model):
    """Пользователь телеграмма"""

    telegram_id = models.BigIntegerField(primary_key=True)
    first_name = models.CharField(max_length=64, null=True, blank=True)
    last_name = models.CharField(max_length=64, null=True, blank=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="tg_user",
    )

    class Meta:
        verbose_name = "Пользователь телеграмма"
        verbose_name_plural = "Пользователи телеграмма"
        db_table = "TelegramUser"
        # verbose_name = "users"
