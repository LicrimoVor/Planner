from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator

discharge = 12
telegram_id_max = 9*int("1"*discharge)


class UserModel(AbstractUser):
    """Модель пользователя."""

    it_user = models.BooleanField("Пользователь сайта", default=False)
    is_staff = models.BooleanField(
        "Администратор",
        default=False,
    )
    telegram_id = models.PositiveIntegerField(
        _('telegram_id'),
        validators=[MaxValueValidator(telegram_id_max)],
        null=True,
    )
    first_name = models.CharField(_('first name'), max_length=150,)
    last_name = models.CharField(_('last name'), max_length=150,)
    email = models.EmailField(_('email address'), unique=True)
    REQUIRED_FIELDS = ['email', 'last_name', 'first_name', "password"]
    groups = None
    id = None

    def __str__(self):
        if not isinstance(self.username, str):
            print(123)
        return str(self.username)

    # @property
    # def telegram_username(self):
    #     return self.objects.prefetch_related()

    class Meta:
        ordering = ("id",)
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"
