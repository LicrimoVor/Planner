from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator

discharge = 12
telegram_id_max = 9*int("1"*discharge)


class UserModel(AbstractUser):
    """Модель пользователя."""

    telegram_id = models.PositiveIntegerField(
        _('telegram_id'),
        validators=[MaxValueValidator(telegram_id_max)],
        null=True,
    )
    REQUIRED_FIELDS = ['email', 'last_name', 'first_name']
    groups = None

    def __str__(self):
        return self.username

    class Meta:
        ordering = ("id",)
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
