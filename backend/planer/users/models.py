from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator


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
    groups = None

    def __str__(self):
        return self.username

    class Meta:
        ordering = ("id",)
        verbose_name = "Пользователь сайта"
        verbose_name_plural = "Пользователи сайта"
