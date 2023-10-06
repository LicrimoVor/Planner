from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator

from core.validators import validate_hex

discharge = 12
telegram_id_max = 9*int("1"*discharge)


class UserModel(AbstractUser):
    """Модель пользователя."""
    is_staff = models.BooleanField(
        "Администратор",
        default=False,
    )
    first_name = models.CharField(_('first name'), max_length=150,)
    last_name = models.CharField(_('last name'), max_length=150,)
    email = models.EmailField(_('email address'), unique=True)
    REQUIRED_FIELDS = ['email', 'last_name', 'first_name', "password"]
    time_zone = models.IntegerField(
        "Часовой пояс",
        default=5,
        validators=[MinValueValidator(0, "В пределах России, окей?"), MaxValueValidator(12, "В пределах России, окей?")]
    )
    color = models.CharField(
        verbose_name="Цвет",
        help_text="Цвет в HEX-формате",
        max_length=7,
        validators=[validate_hex],
        default="#D7D2D2"
    )
    groups = None

    def __str__(self):
        return self.username

    class Meta:
        ordering = ("id",)
        verbose_name = "Пользователь сайта"
        verbose_name_plural = "Пользователи сайта"
