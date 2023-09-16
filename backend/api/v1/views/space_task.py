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
        queryset = SpaceTaskModel.objects.filter(space=self.space)
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


class SpaceSubTaskView(APIView, LimitOffsetPagination):
    """ViewSet подзадач пространств."""
    permission_classes = [IsAuthenticated&SpaceStaffPermission]

    def get_queryset(self, task_id):
        queryset_id = SpaceTaskModel.objects.filter(id=task_id).values_list("main_task_space__subtask", flat=True)
        queryset = SpaceTaskModel.objects.filter(id__in=queryset_id)
        return queryset

    def get_serializer_context(self):
        return {
            'space_model': self.space,
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    def get(self, request, *args, **kwargs):
        task_id = kwargs.get("task_id")
        queryset = self.get_queryset(task_id)
        result = self.paginate_queryset(queryset, request, view=self)
        serializer = SpaceTaskSerializer(
            result,
            context=self.get_serializer_context(),
            many=True
        )
        return self.get_paginated_response(serializer.data)

    def post(self, request, *args, **kwargs):
        task_id = kwargs.get("task_id")
        serializer = SpaceTaskSerializer(
            data=request.data,
            context=self.get_serializer_context(),
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        task = SpaceTaskModel.objects.get(id=task_id)
        SubSpaceTasksM2M.objects.create(task=task, subtask=serializer.instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def initial(self, request, *args, **kwargs):
        space_id = self.kwargs.get("space_id")
        self.space = get_object_or_404(SpaceModel, id=space_id)
        return super().initial(request, *args, **kwargs)


class HistoryView(APIView, LimitOffsetPagination):
    """View истории всех изменений."""
    permission_classes = [IsAuthenticated&SpaceStaffPermission]

    def get_queryset(self):
        queryset = SpaceTaskModel.objects.filter(space=self.space)
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
        queryset = get_object_or_404(SpaceTaskModel, id=task_id).log.all().order_by('-history_date')
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
        queryset = SpaceTaskModel.objects.filter(responsibles=user)
        return queryset
