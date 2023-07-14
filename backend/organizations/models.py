from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class OrgModel(models.Model):
    """Модель организаций"""
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
        through="UserOrgModel",
        related_name="staff",
    )

    class Meta:
        db_table = "Organizations"
        verbose_name = "Организация"
        verbose_name_plural = "Организации"


class UserOrgModel(models.Model):
    """Модель персонала M2M"""

    organization = models.ForeignKey(
        OrgModel,
        on_delete=models.CASCADE,
        related_name="org_org",
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="user_org",
    )

    class Meta:
        unique_together = ["organization", "user"]
