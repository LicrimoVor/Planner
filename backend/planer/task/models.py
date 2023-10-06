from django.contrib.auth import get_user_model
from django.db import models

from simple_history.models import HistoricalRecords

from space.models import SpaceModel
from .abstract_models import TaskModel, NameColorModel

User = get_user_model()


class TagModel(NameColorModel):
    """Модель тегов."""

    class Meta:
        verbose_name = "Тег"
        verbose_name_plural = "Теги"
        db_table = "Tag"


class StatusModel(NameColorModel):
    """Модель статусов."""

    class Meta:
        db_table = "Status"
        verbose_name = "Статус"
        verbose_name_plural = "Статусы"


class PersonalTaskModel(TaskModel):
    """Модель персональной задачи."""

    tags = models.ManyToManyField(
        TagModel,
        verbose_name="Теги",
        through="TagPersonalTaskModel",
        related_name="tags+",
    )
    status = models.ForeignKey(
        StatusModel,
        on_delete=models.SET_NULL,
        related_name="status+",
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "Персональная задача"
        verbose_name_plural = "Персональные задачи"
        db_table = "PersonalTask"


class TagPersonalTaskModel(models.Model):
    """Модель связи тегов и задач."""

    tag = models.ForeignKey(
        TagModel,
        verbose_name="Тег (id)",
        on_delete=models.CASCADE,
        related_name='+',
    )
    task = models.ForeignKey(
        PersonalTaskModel,
        verbose_name="Задача (id)",
        on_delete=models.CASCADE,
        related_name='+',
    )

    class Meta:
        unique_together = ["task", "tag"]

    def __str__(self) -> str:
        return f'{self.task} {self.tag}'


class SpaceTaskModel(TaskModel):
    """Модель  задачи."""

    status = models.ForeignKey(
        StatusModel,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="status+",
    )
    tags = models.ManyToManyField(
        TagModel,
        verbose_name="Теги",
        through="TagSpaceTaskModel",
        related_name="tags+",
    )
    space = models.ForeignKey(
        SpaceModel,
        on_delete=models.CASCADE,
        related_name='space',
    )
    responsibles = models.ManyToManyField(
        User,
        verbose_name="Ответственные",
        through="ResponsibleSpaceTasks",
        related_name="responsibles",
    )
    logs = HistoricalRecords(related_name='history')

    class Meta:
        verbose_name = "Задача пространства"
        verbose_name_plural = "Задачи пространства"
        db_table = "SpaceTask"


class TagSpaceTaskModel(models.Model):
    """Модель связи тегов и задач."""

    tag = models.ForeignKey(
        TagModel,
        verbose_name="Тег (id)",
        on_delete=models.CASCADE,
        related_name='tag_space+',
    )
    task = models.ForeignKey(
        SpaceTaskModel,
        verbose_name="Задача (id)",
        on_delete=models.CASCADE,
        related_name='task_space+',
    )

    class Meta:
        unique_together = ["task", "tag"]

    def __str__(self) -> str:
        return f'{self.task} {self.tag}'


class ResponsibleSpaceTasks(models.Model):
    """Модель М2М ответственных."""

    task = models.ForeignKey(
        SpaceTaskModel,
        on_delete=models.CASCADE,
        verbose_name="Main задача",
        related_name="task_space",
    )
    user = models.ForeignKey(
        User,
        verbose_name="Ответственный",
        related_name="resp_user_space",
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = ["task", "user"]
