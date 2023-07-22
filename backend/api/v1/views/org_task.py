from django.shortcuts import get_object_or_404
from rest_framework import filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination

from task.models import OrgTaskModel, SubOrgTasksM2M
from organizations.models import OrgModel
from ..permissions import OrgTaskPermission
from ..filters import (TagTaskFilter, StatusTaskFilter,
                       ActualTaskFilter, MainOrgTaskFilter,
                       ResponsibleTaskFilter)
from ..serializers.org_task import OrgTaskSerializer, HistorySerializer


class OrgTaskSet(ModelViewSet):
    """ViewSet задач организации."""

    queryset = OrgTaskModel.objects.all()
    serializer_class = OrgTaskSerializer
    permission_classes = [IsAuthenticated&OrgTaskPermission]
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,
                       MainOrgTaskFilter,
                       ResponsibleTaskFilter,)
    search_fields = ("name", )
    ordering_fields = ("deadline",)

    def get_queryset(self):
        queryset = OrgTaskModel.objects.filter(organization=self.organizataion)
        return queryset

    def get_serializer_context(self):
        return {
            'organization_model': self.organizataion,
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    def initial(self, request, *args, **kwargs):
        org_id = self.kwargs.get("org_id")
        self.organizataion = get_object_or_404(OrgModel, id=org_id)
        return super().initial(request, *args, **kwargs)


class OrgSubTaskView(APIView, LimitOffsetPagination):
    """ViewSet подзадач организации."""
    permission_classes = [IsAuthenticated&OrgTaskPermission]

    def get_queryset(self, task_id):
        queryset_id = OrgTaskModel.objects.filter(id=task_id).values_list("main_task_org__subtask", flat=True)
        queryset = OrgTaskModel.objects.filter(id__in=queryset_id)
        return queryset

    def get_serializer_context(self):
        return {
            'organization_model': self.organizataion,
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    def get(self, request, *args, **kwargs):
        task_id = kwargs.get("task_id")
        queryset = self.get_queryset(task_id)
        result = self.paginate_queryset(queryset, request, view=self)
        serializer = OrgTaskSerializer(
            result,
            context=self.get_serializer_context(),
            many=True
        )
        return self.get_paginated_response(serializer.data)

    def post(self, request, *args, **kwargs):
        task_id = kwargs.get("task_id")
        serializer = OrgTaskSerializer(
            data=request.data,
            context=self.get_serializer_context(),
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        task = OrgTaskModel.objects.get(id=task_id)
        SubOrgTasksM2M.objects.create(task=task, subtask=serializer.instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def initial(self, request, *args, **kwargs):
        org_id = self.kwargs.get("org_id")
        self.organizataion = get_object_or_404(OrgModel, id=org_id)
        return super().initial(request, *args, **kwargs)


class HistoryView(APIView, LimitOffsetPagination):
    """View истории всех изменений."""
    permission_classes = [IsAuthenticated&OrgTaskPermission]

    def get_queryset(self):
        # queryset = OrgTaskModel.objects.filter(organization=self.organizataion).values_list("history", flat=True).all().order_by('-history_date')
        # queryset = OrgTaskModel.objects.filter(history__history_organization=self.organizataion.id)
        # queryset = OrgTaskModel.objects.filter(organization=self.organizataion).history
        # queryset = OrgTaskModel.objects.filter(
        #     organization=self.organizataion).prefetch_related(
        #         Prefetch('history',
        #                  queryset=OrgTaskModel.history,
        #                  to_attr='ordered_histories')
        #     ).all()
        queryset = OrgTaskModel.objects.filter(organization=self.organizataion)
        # Q_list = []
        # for int, quer in enumerate(queryset):
        #     if not histoty_queryset:
        #         histoty_queryset = quer.log.all()
        #     else:
        #         histoty_queryset = histoty_queryset.union(quer.log.all())
        # histoty_queryset = histoty_queryset.order_by('-history_date')
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
        org_id = self.kwargs.get("org_id")
        self.organizataion = get_object_or_404(OrgModel, id=org_id)
        return super().initial(request, *args, **kwargs)


class HistoryTaskView(APIView, LimitOffsetPagination):
    """View истории изменений одной задачи."""
    permission_classes = [IsAuthenticated&OrgTaskPermission]

    def get_queryset(self):
        task_id = self.kwargs.get("task_id")
        queryset = get_object_or_404(OrgTaskModel, id=task_id).log.all().order_by('-history_date')
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
        org_id = self.kwargs.get("org_id")
        self.organizataion = get_object_or_404(OrgModel, id=org_id)
        return super().initial(request, *args, **kwargs)
