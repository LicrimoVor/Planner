from rest_framework.permissions import IsAuthenticated
# from django.shortcuts import get_object_or_404

from task.models import PersonalTaskModel
from ..permissions import AuthorPermission
from ..serializers.personal_task import PersonalTaskSerializer
from .abstract import TaskSet, SubTaskSet, SubTaskChangeView, TaskTreeView


class PersonalTaskSet(TaskSet):
    """ViewSet персональных задач."""

    model_task = PersonalTaskModel
    queryset = PersonalTaskModel.objects.all()
    serializer_class = PersonalTaskSerializer
    permission_classes = [IsAuthenticated&AuthorPermission]

    def get_queryset(self):
        author = self.request.user
        queryset = self.model_task.objects.filter(author=author).order_by("-id")
        return queryset


class PersonalSubTaskSet(SubTaskSet):
    """View персональных подзадач."""

    model_task = PersonalTaskModel
    queryset = PersonalTaskModel.objects.all()
    serializer_class = PersonalTaskSerializer
    permission_classes = [IsAuthenticated&AuthorPermission]

    def get_serializer_context(self):
        data = super().get_serializer_context()
        data["task_id"] = self.kwargs["task_id"]
        return data


class PersonalTaskTreeView(TaskTreeView):
    """View для удаления дерева персональной задачи."""

    permission_classes = [IsAuthenticated&AuthorPermission]
    model_task = PersonalTaskModel


class PersonalSubTaskChangeView(SubTaskChangeView):
    """View для измены родителя персональной подзадачи по get-запросу."""

    permission_classes = [IsAuthenticated&AuthorPermission]
    model_task = PersonalTaskModel
