import logging

from rest_framework import filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import exceptions
from django.shortcuts import get_object_or_404

from task.models import PersonalTaskModel, SubPersonalTasksM2M
from ..permissions import AuthorPermission
from ..filters import (TagTaskFilter, StatusTaskFilter,
                       ActualTaskFilter, MainPersonalTaskFilter,)
from ..serializers.personal_task import PersonalTaskSerializer
from core.collections import Queue
from ..viewsets import GetPostSet


logger = logging.getLogger(__name__)


class PersonalTaskSet(ModelViewSet):
    """ViewSet персональных задач."""

    queryset = PersonalTaskModel.objects.all()
    serializer_class = PersonalTaskSerializer
    permission_classes = [IsAuthenticated&AuthorPermission]
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,
                       MainPersonalTaskFilter)
    search_fields = ("name", )
    ordering_fields = ("deadline",)

    def get_queryset(self):
        author = self.request.user
        queryset = PersonalTaskModel.objects.filter(author=author).order_by("-id")
        return queryset

    def update(self, request, *args, **kwargs):
        logging.info(request.data)
        return super().update(request, *args, **kwargs)


class PersonalSubTaskSet(GetPostSet):
    """View персональных подзадач."""
    queryset = PersonalTaskModel.objects.all()
    serializer_class = PersonalTaskSerializer
    permission_classes = [IsAuthenticated&AuthorPermission]
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,
                       MainPersonalTaskFilter)
    search_fields = ("name", )
    ordering_fields = ("deadline",)

    def get_queryset(self):
        task_id = self.kwargs["task_id"]
        queryset_id = PersonalTaskModel.objects.filter(id=task_id).values_list("main_task_pers__subtask", flat=True)
        queryset = PersonalTaskModel.objects.filter(id__in=queryset_id).order_by("-id")
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        task_id = self.kwargs["task_id"]
        task = PersonalTaskModel.objects.get(id=task_id)
        SubPersonalTasksM2M.objects.create(task=task, subtask=serializer.instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_serializer_context(self):
        data = super().get_serializer_context()
        data["task_id"] = self.kwargs["task_id"]
        return data


class PersonalTaskTreeView(APIView):
    """View дерева персональной задачи."""
    permission_classes = [IsAuthenticated&AuthorPermission]

    def delete(self, request, *args, **kwargs):
        queue = Queue()
        queue.put(kwargs.get("task_id"))
        tasks_id = []
        while not queue.empty():
            id_task = queue.get()
            tasks_id.append(id_task)
            subtasks_id = SubPersonalTasksM2M.objects.filter(task__id=id_task).values_list("subtask", flat=True)
            queue.put_list(subtasks_id)
        PersonalTaskModel.objects.filter(id__in=tasks_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PersonalSubTaskChangeView(APIView):
    permission_classes = [IsAuthenticated&AuthorPermission]
      
    def get(self, request, *args, **kwargs):
        if kwargs.get("task_to", 0) == 0:
            SubPersonalTasksM2M.objects.get(subtask__id=kwargs["task_from"]).delete()
            return Response(status=status.HTTP_200_OK)

        subtask = get_object_or_404(PersonalTaskModel, id=kwargs["task_from"])
        main_task = get_object_or_404(PersonalTaskModel, id=kwargs["task_to"])

        queue = Queue()
        queue.put(kwargs["task_from"])
        tasks_id = []
        while not queue.empty():
            sub_task_id = queue.get()
            tasks_id.append(sub_task_id)
            m_tasks_id = list(SubPersonalTasksM2M.objects.filter(subtask__id=sub_task_id).values_list("task", flat=True))
            queue.put_list(m_tasks_id)

        if kwargs["task_to"] in tasks_id:
            raise exceptions.ValidationError(f"Не возможно задачу {subtask.id} "
                                             + f"сделать подзадачей {main_task.id}!")

        try:
            SubPersonalTasksM2M.objects.get(subtask=kwargs["task_from"]).delete()
        except SubPersonalTasksM2M.DoesNotExist:
            pass

        SubPersonalTasksM2M.objects.create(subtask=subtask, task=main_task)

        return Response(status=status.HTTP_200_OK)
