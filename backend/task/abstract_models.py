from django.db import models
from django.contrib.auth import get_user_model

from core.validators import validate_hex

User = get_user_model()


class TaskModel(models.Model):
    """Абстрактная модель задач"""
    name = models.CharField(
        verbose_name="Имя",
        max_length=255,
    )
    discription = models.TextField(
        verbose_name="Описание"
    )
    # author = models.ForeignKey(
    #     User,
    #     on_delete=models.CASCADE,
    #     related_name="author",
    # )
    deadline = models.DateTimeField(
        verbose_name="Дедлайн",
    )
    
    class Meta:
        abstract = True
    
    def __str__(self) -> str:
        return self.name


class NameColorModel(models.Model):
    """Абстрактная модель цвета-имя"""

    name = models.CharField(
        verbose_name="Название",
        help_text="Название тега",
        max_length=200,
        unique=True,
    )
    color = models.CharField(
        verbose_name="Цвет",
        help_text="Цвет в HEX-формате",
        max_length=7,
        unique=True,
        validators=[validate_hex],
    )

    class Meta:
        ordering = ("id",)
        abstract = True

    def __str__(self) -> str:
        return self.name