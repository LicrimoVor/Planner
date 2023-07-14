from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
from django.db import models

from simple_history.models import HistoricalRecords

from organizations.models import OrgModel
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

    subtasks = models.ManyToManyField(
        "self", symmetrical=False,
        verbose_name="Подзадачи",
        through="SubPersonalTasksM2M",
        related_name="subtasks+",
    )
    tags = models.ManyToManyField(
        TagModel,
        verbose_name="Теги",
        through="TagPersonalTaskModel",
        related_name="tags+",
    )
    status = models.ForeignKey(
        StatusModel,
        on_delete=models.SET_NULL,
        null=True,
        related_name="status+",
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="author_task_pers",
    )

    class Meta:
        verbose_name = "Персональная задача"
        verbose_name_plural = "Персональные задачи"
        db_table = "PersonalTask"


class SubPersonalTasksM2M(models.Model):
    """Модель М2М для подзадач."""
    
    task = models.ForeignKey(
        PersonalTaskModel,
        on_delete=models.CASCADE,
        verbose_name="Main задача",
        related_name="main_task_pers",
    )
    subtask = models.ForeignKey(
        PersonalTaskModel,
        verbose_name="Sub задача",
        related_name="sub_task_pers",
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = ["task", "subtask"]


class TagPersonalTaskModel(models.Model):
    """Модель связи тегов и задач."""

    tag = models.ForeignKey(
        TagModel,
        verbose_name="Тег (id)",
        on_delete=models.CASCADE,
        related_name='tag_pers',
    )
    task = models.ForeignKey(
        PersonalTaskModel,
        verbose_name="Задача (id)",
        on_delete=models.CASCADE,
        related_name='task_pers',
    )

    def __str__(self) -> str:
        return f'{self.task} {self.tag}'


class OrgTaskModel(TaskModel):
    """Модель  задачи."""

    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="author_task_org",
    )
    subtasks = models.ManyToManyField(
        "self", symmetrical=False,
        verbose_name="Подзадачи",
        through="SubOrgTasksM2M",
        related_name="subtasks+",
    )
    status = models.ForeignKey(
        StatusModel,
        on_delete=models.SET_NULL,
        null=True,
        related_name="status+",
    )
    tags = models.ManyToManyField(
        TagModel,
        verbose_name="Теги",
        through="TagOrgTaskModel",
        related_name="tags+"
    )
    organization = models.ForeignKey(
        OrgModel,
        on_delete=models.CASCADE,
        related_name='organization',
    )
    responsibles = models.ManyToManyField(
        User,
        verbose_name="Ответственные",
        through="ResponsibleOrgTasks",
        related_name="responsibles",
    )
    history = HistoricalRecords()

    class Meta:
        verbose_name = "Задача организации"
        verbose_name_plural = "Задачи организации"
        db_table = "OrgTask"


class TagOrgTaskModel(models.Model):
    """Модель связи тегов и задач."""

    tag = models.ForeignKey(
        TagModel,
        verbose_name="Тег (id)",
        on_delete=models.CASCADE,
        related_name='tag_org+',
    )
    task = models.ForeignKey(
        OrgTaskModel,
        verbose_name="Задача (id)",
        on_delete=models.CASCADE,
        related_name='task_org+',
    )

    def __str__(self) -> str:
        return f'{self.task} {self.tag}'


class SubOrgTasksM2M(models.Model):
    """Модель М2М для подзадач."""
    
    task = models.ForeignKey(
        OrgTaskModel,
        on_delete=models.CASCADE,
        verbose_name="Main задача",
        related_name="main_task_org",
    )
    subtask = models.ForeignKey(
        OrgTaskModel,
        verbose_name="Sub задача",
        related_name="sub_task_org",
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = ["task", "subtask"]


class ResponsibleOrgTasks(models.Model):
    """Модель М2М ответственных."""
    
    task = models.ForeignKey(
        OrgTaskModel,
        on_delete=models.CASCADE,
        verbose_name="Main задача",
        related_name="task_org",
    )
    user = models.ForeignKey(
        User,
        verbose_name="Ответственный",
        related_name="resp_user_org",
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = ["task", "user"]
