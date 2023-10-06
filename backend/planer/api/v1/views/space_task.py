from django.shortcuts import get_object_or_404
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.generics import ListAPIView
from rest_framework import exceptions

from task.models import SpaceTaskModel
from space.models import SpaceModel
from ..permissions import SpaceStaffPermission
from ..filters import (TagTaskFilter, StatusTaskFilter,
                       ActualTaskFilter, MainTaskFilter,
                       ResponsibleTaskFilter, SpaceTaskFilter)
from ..serializers.space_task import SpaceTaskSerializer, HistorySerializer
from .abstract import TaskSet, SubTaskSet, SubTaskChangeView, TaskTreeView


class SpaceTaskSet(TaskSet):
    """ViewSet задач пространств."""
    model_task = SpaceTaskModel
    queryset = SpaceTaskModel.objects.all()
    serializer_class = SpaceTaskSerializer
    permission_classes = [IsAuthenticated&SpaceStaffPermission]
    filter_backends = TaskSet.filter_backends + [ResponsibleTaskFilter, ]

    def get_queryset(self):
        queryset = SpaceTaskModel.objects.filter(space=self.space).order_by("-id")
        return queryset

    def get_serializer_context(self):
        return {
            'space_model': self.space,
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    def initial(self, request, *args, **kwargs):
        space_id = self.kwargs.get("space_id")
        self.space = get_object_or_404(SpaceModel, id=space_id)
        return super().initial(request, *args, **kwargs)


class SpaceSubTaskSet(SubTaskSet):
    """ViewSet подзадач пространств."""
    model_task = SpaceTaskModel
    queryset = SpaceTaskModel.objects.all()
    serializer_class = SpaceTaskSerializer
    permission_classes = [IsAuthenticated&SpaceStaffPermission]
    filter_backends = TaskSet.filter_backends + [ResponsibleTaskFilter, ]

    def get_serializer_context(self):
        return {
            'space_model': self.space,
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    def initial(self, request, *args, **kwargs):
        space_id = self.kwargs.get("space_id")
        self.space = get_object_or_404(SpaceModel, id=space_id)
        return super().initial(request, *args, **kwargs)


class SpaceTaskTreeView(TaskTreeView):
    """View дерева персональной задачи."""
    model_task = SpaceTaskModel
    permission_classes = [IsAuthenticated&SpaceStaffPermission]


class SpaceSubTaskChangeView(SubTaskChangeView):
    model_task = SpaceTaskModel
    permission_classes = [IsAuthenticated&SpaceStaffPermission]
      
    def get(self, request, *args, **kwargs):
        space_id = self.kwargs.get("space_id")
        subtask = get_object_or_404(SpaceTaskModel, id=kwargs["task_from"])
        if subtask.space.id != space_id:
            raise exceptions.ValidationError(f"Задача {subtask.id} не является задачей данного пространства!")
        if kwargs.get("task_to", 0) != 0:
            main_task = get_object_or_404(SpaceTaskModel, id=kwargs["task_to"])
            if main_task.space.id != space_id:
                raise exceptions.ValidationError(f"Задача {main_task.id} не является задачей данного пространства!")
        return  super().get(request, *args, **kwargs)


class HistoryView(APIView, LimitOffsetPagination):
    """View истории всех изменений."""
    permission_classes = [IsAuthenticated&SpaceStaffPermission]

    def get_queryset(self):
        queryset = SpaceTaskModel.logs.filter(space_id=self.space).order_by('-history_date')
        return queryset

    def get(self, request, *args, **kwargs):
        """Выдает список всех изменений."""
        queryset = self.get_queryset()
        result = self.paginate_queryset(queryset, request, view=self)
        serializer = HistorySerializer(
            result,
            context={"request": request},
            many=True,
        )
        return self.get_paginated_response(serializer.data)

    def initial(self, request, *args, **kwargs):
        space_id = self.kwargs.get("space_id")
        self.space = get_object_or_404(SpaceModel, id=space_id)
        return super().initial(request, *args, **kwargs)


class HistoryTaskView(APIView, LimitOffsetPagination):
    """View истории изменений одной задачи."""
    permission_classes = [IsAuthenticated&SpaceStaffPermission]

    def get_queryset(self):
        task_id = self.kwargs.get("task_id")
        queryset = SpaceTaskModel.logs.filter(id=task_id).order_by('-history_date')
        return queryset

    def get(self, request, *args, **kwargs):
        """Выдает список всех изменений."""
        queryset = self.get_queryset()
        result = self.paginate_queryset(queryset, request, view=self)
        serializer = HistorySerializer(
            result,
            context={"request": request},
            many=True,
        )
        return self.get_paginated_response(serializer.data)

    def initial(self, request, *args, **kwargs):
        space_id = self.kwargs.get("space_id")
        self.space = get_object_or_404(SpaceModel, id=space_id)
        return super().initial(request, *args, **kwargs)


class SpaceTaskMeView(ListAPIView):
    """
    ViewSet задач пространств,
    в которых пользователь отмечен, как ответственный
    """

    queryset = SpaceTaskModel.objects.all()
    serializer_class = SpaceTaskSerializer
    permission_classes = [IsAuthenticated,]
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,
                       MainTaskFilter,
                       SpaceTaskFilter)
    search_fields = ("name", )
    ordering_fields = ("deadline",)

    def get_queryset(self):
        user = self.request.user
        queryset = SpaceTaskModel.objects.filter(responsibles=user).order_by("-id")
        return queryset
