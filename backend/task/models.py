from core.validators import validate_hex
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
from django.db import models

from simple_history.models import HistoricalRecords

from organizations.models import OrgModel

User = get_user_model()


class TagModel(models.Model):
    """Модель тегов."""

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
        db_table = "Tag"

    def __str__(self) -> str:
        return self.name


class StatusModel(models.Model):
    """Модель статусов."""

    name = models.CharField(
        verbose_name="Название",
        help_text="Статус задачи",
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
        db_table = "Status"

    def __str__(self) -> str:
        return self.name


class PersonalTaskModel(models.Model):
    """Модель персональной задачи."""

    name = models.CharField(
        verbose_name="Имя",
        max_length=255,
    )
    discription = models.TextField(
        verbose_name="Описание"
    )
    status = models.ForeignKey(
        StatusModel,
        on_delete=models.SET_NULL,
        null=True,
        related_name="status",
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="author"
    )
    deadline = models.DateTimeField(
        verbose_name="Дедлайн",
    )
    subtasks = models.ManyToManyField(
        "self", symmetrical=False,
        verbose_name="Подзадачи",
        through="SubPersonalTasksM2M",
    )
    tags = models.ManyToManyField(
        TagModel,
        verbose_name="Теги",
        through="TagPersonalTaskModel",
    )
    main_task = models.BooleanField(
        verbose_name="This main task?",
    )

    def __str__(self) -> str:
        return self.name


class SubPersonalTasksM2M(models.Model):
    """Модель М2М для подзадач."""
    
    task = models.ForeignKey(
        PersonalTaskModel,
        on_delete=models.CASCADE,
        verbose_name="Main задача",
        related_name="task",
    )
    subtask = models.ForeignKey(
        PersonalTaskModel,
        verbose_name="Sub задача",
        related_name="subtask",
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
        related_name='tag_task',
    )
    task = models.ForeignKey(
        PersonalTaskModel,
        verbose_name="Задача (id)",
        on_delete=models.CASCADE,
        related_name='tag_task',
    )

    def __str__(self) -> str:
        return f'{self.task} {self.tag}'


class OrgTaskModel(models.Model):
    """Модель  задачи."""

    name = models.CharField(
        verbose_name="Имя",
        max_length=255,
    )
    discription = models.TextField(
        verbose_name="Описание"
    )
    status = models.ForeignKey(
        StatusModel,
        on_delete=models.SET_NULL,
        null=True,
        related_name="status",
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="author"
    )
    deadline = models.DateTimeField(
        verbose_name="Дедлайн",
    )
    subtasks = models.ManyToManyField(
        "self", symmetrical=False,
        verbose_name="Подзадачи",
        through="SubOrgTasksM2M",
    )
    tags = models.ManyToManyField(
        TagModel,
        verbose_name="Теги",
        through="TagOrgTaskModel",
    )
    main_task = models.BooleanField(
        verbose_name="This main task?",
    )
    organization = models.ForeignKey(
        OrgModel,
        on_delete=models.CASCADE,
        related_name='organization',
    )
    responsible = models.ManyToManyField(
        User,
        verbose_name="Ответственные",
        through="ResponsibleOrgTasks",
    )
    history = HistoricalRecords()

    def __str__(self) -> str:
        return self.name


class TagOrgTaskModel(models.Model):
    """Модель связи тегов и задач."""

    tag = models.ForeignKey(
        TagModel,
        verbose_name="Тег (id)",
        on_delete=models.CASCADE,
        related_name='tag_task',
    )
    task = models.ForeignKey(
        OrgTaskModel,
        verbose_name="Задача (id)",
        on_delete=models.CASCADE,
        related_name='tag_task',
    )

    def __str__(self) -> str:
        return f'{self.task} {self.tag}'


class SubOrgTasksM2M(models.Model):
    """Модель М2М для подзадач."""
    
    task = models.ForeignKey(
        OrgTaskModel,
        on_delete=models.CASCADE,
        verbose_name="Main задача",
        related_name="task",
    )
    subtask = models.ForeignKey(
        OrgTaskModel,
        verbose_name="Sub задача",
        related_name="subtask",
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = ["task", "subtask"]


class ResponsibleOrgTasks(models.Model):
    """Модель М2М для подзадач."""
    
    task = models.ForeignKey(
        OrgTaskModel,
        on_delete=models.CASCADE,
        verbose_name="Main задача",
        related_name="task",
    )
    user = models.ForeignKey(
        User,
        verbose_name="Ответственный",
        related_name="user",
        on_delete=models.CASCADE,
    )

    class Meta:
        unique_together = ["task", "user"]


