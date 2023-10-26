import logging

from rest_framework import filters, status, exceptions, mixins
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from ..filters import (TagTaskFilter, StatusTaskFilter,
                       ActualTaskFilter, MainTaskFilter)
from core.collections import Queue
from task.abstract_models import TaskModel


logger = logging.getLogger(__name__)


class GetPostSet(mixins.ListModelMixin,
                 mixins.CreateModelMixin,
                 GenericViewSet):
    """Viewset, обрабатывающий post и get-list запросы"""
    pass


class TaskSet(ModelViewSet):
    """ViewSet задач."""

    model_task: TaskModel
    filter_backends = [filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,
                       MainTaskFilter,]
    search_fields = ("name", "description")
    ordering_fields = ("deadline",)


class SubTaskSet(GetPostSet):
    """View подзадач."""

    model_task: TaskModel
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,
                       MainTaskFilter,)
    search_fields = ("name", )
    ordering_fields = ("deadline",)

    def get_queryset(self):
        task_id = self.kwargs["task_id"]
        queryset = get_object_or_404(self.model_task, id=task_id).subtasks.all()
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        task_id = self.kwargs["task_id"]
        task = get_object_or_404(self.model_task, id=task_id)
        serializer.instance.parent = task
        serializer.instance.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class TaskTreeView(APIView):
    """АК-View удаления дерева задач."""

    model_task: TaskModel

    def delete(self, request, *args, **kwargs):
        queue = Queue()
        queue.put(kwargs.get("task_id"))
        tasks_id = []
        while not queue.empty():
            id_task = queue.get()
            tasks_id.append(id_task)
            subtasks_id = list(self.model_task.objects.filter(id=id_task).values_list("subtasks", flat=True))
            queue.put_list(subtasks_id)
        self.model_task.objects.filter(id__in=tasks_id).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SubTaskChangeView(APIView):
    """АК-View для измены родителя подзадачи по get-запросу."""

    model_task: TaskModel
      
    def get(self, request, *args, **kwargs):
        subtask = get_object_or_404(self.model_task, id=kwargs["task_from"])
        if kwargs.get("task_to", 0) == 0:
            subtask.parent = None
        else:
            main_task = get_object_or_404(self.model_task, id=kwargs["task_to"])
            queue = Queue()
            queue.put(kwargs["task_from"])
            tasks_id = []
            while not queue.empty():
                id_task = queue.get()
                tasks_id.append(id_task)
                subtasks_id = list(self.model_task.objects.filter(id=id_task).values_list("subtasks", flat=True))
                queue.put_list(subtasks_id)

            if kwargs["task_to"] in tasks_id:
                raise exceptions.ValidationError(f"Не возможно задачу {subtask.id} "
                                                + f"сделать подзадачей {main_task.id}!")

            subtask.parent = main_task
        subtask.save()
        return Response(status=status.HTTP_200_OK)
