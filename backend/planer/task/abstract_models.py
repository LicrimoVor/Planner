from django.db import models
from django.contrib.auth import get_user_model
from django.utils.html import format_html

from core.validators import validate_hex

User = get_user_model()


class TaskModel(models.Model):
    """Абстрактная модель задач"""
    name = models.CharField(
        verbose_name="Имя",
        max_length=255,
        null=True,
        blank=True,
    )
    description = models.TextField(
        verbose_name="Описание",
        null=True,
        blank=True,
    )
    deadline = models.DateTimeField(
        verbose_name="Дедлайн",
        null=True,
        blank=True,
    )
    parent = models.ForeignKey(
        "self",
        verbose_name="Родитель",
        related_name="subtasks",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="+",
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
    )
    color = models.CharField(
        verbose_name="Цвет",
        help_text="Цвет в HEX-формате",
        max_length=7,
        validators=[validate_hex],
    )
    slug = models.SlugField(
        verbose_name="Slug",
        help_text="Краткое имя",
    )

    class Meta:
        ordering = ("id",)
        abstract = True

    def __str__(self) -> str:
        return self.name

    @property
    def color_html(self):
        return format_html(
            '<span style="color: {};">{}</span>',
            self.color,
            self.color
        )
