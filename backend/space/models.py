from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class SpaceModel(models.Model):
    """Модель пространства"""
    name = models.CharField(
        verbose_name="Название",
        max_length=200
    )
    admin = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="admin_org",
        null=True,
    )
    staff = models.ManyToManyField(
        User,
        verbose_name="Персонал",
        through="UserSpaceModel",
        related_name="staff",
    )

    class Meta:
        db_table = "Spaces"
        verbose_name = "Пространство"
        verbose_name_plural = "Пространства"


class UserSpaceModel(models.Model):
    """Модель персонала M2M"""

    space = models.ForeignKey(
        SpaceModel,
        on_delete=models.CASCADE,
        related_name="space_space",
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="user_space",
    )

    class Meta:
        unique_together = ["space", "user"]
