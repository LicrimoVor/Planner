from django.shortcuts import get_object_or_404
from rest_framework import filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.generics import ListAPIView

from task.models import SpaceTaskModel, SubSpaceTasksM2M
from space.models import SpaceModel
from ..permissions import SpaceStaffPermission
from ..filters import (TagTaskFilter, StatusTaskFilter,
                       ActualTaskFilter, MainSpaceTaskFilter,
                       ResponsibleTaskFilter, SpaceTaskFilter)
from ..serializers.space_task import SpaceTaskSerializer, HistorySerializer
from ..viewsets import GetPostSet

class SpaceTaskSet(ModelViewSet):
    """ViewSet задач пространств."""

    queryset = SpaceTaskModel.objects.all()
    serializer_class = SpaceTaskSerializer
    permission_classes = [IsAuthenticated&SpaceStaffPermission]
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,
                       MainSpaceTaskFilter,
                       ResponsibleTaskFilter,)
    search_fields = ("name", )
    ordering_fields = ("deadline",)

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


class SpaceSubTaskSet(GetPostSet):
    """ViewSet подзадач пространств."""
    queryset = SpaceTaskModel.objects.all()
    serializer_class = SpaceTaskSerializer
    permission_classes = [IsAuthenticated&SpaceStaffPermission]
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,
                       ResponsibleTaskFilter,)
    search_fields = ("name", )
    ordering_fields = ("deadline",)

    def get_queryset(self,):
        task_id = self.kwargs["task_id"]
        queryset_id = SpaceTaskModel.objects.filter(id=task_id).values_list("main_task_space__subtask", flat=True)
        queryset = SpaceTaskModel.objects.filter(id__in=queryset_id).order_by("-id")
        return queryset

    def get_serializer_context(self):
        return {
            'space_model': self.space,
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        task_id = self.kwargs["task_id"]
        task = SpaceTaskModel.objects.get(id=task_id)
        SubSpaceTasksM2M.objects.create(task=task, subtask=serializer.instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def initial(self, request, *args, **kwargs):
        space_id = self.kwargs.get("space_id")
        self.space = get_object_or_404(SpaceModel, id=space_id)
        return super().initial(request, *args, **kwargs)


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
                       MainSpaceTaskFilter,
                       SpaceTaskFilter)
    search_fields = ("name", )
    ordering_fields = ("deadline",)

    def get_queryset(self):
        user = self.request.user
        queryset = SpaceTaskModel.objects.filter(responsibles=user).order_by("-id")
        return queryset
