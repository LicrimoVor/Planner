from datetime import datetime as dt

from rest_framework.filters import BaseFilterBackend

from organizations.models import OrgModel
from task.models import SubPersonalTasksM2M


class TagTaskFilter(BaseFilterBackend):
    """Фильтрация задач по тегу."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('tags'):
            tags_list = request.query_params.getlist('tags')
            queryset = queryset.filter(tags__slug__in=tags_list).distinct()
        return queryset


class StatusTaskFilter(BaseFilterBackend):
    """Фильтрация задач по статусу."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('status'):
            status_list = request.query_params.getlist('status')
            queryset = queryset.filter(status__slug__in=status_list).distinct()
        return queryset


class MainOrgTaskFilter(BaseFilterBackend):
    """Фильтрация главных задач."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('main'):
            # subtask_id_queryset = SubPersonalTasksM2M.objects.values_list("subtask__id", flat=True).distinct()
            # subtask_id_list = []
            # for subtask_id in enumerate(subtask_id_queryset):
            #     subtask_id_list.append(subtask_id["id"])
            # queryset.objects.exclude(id__in=subtask_id_list)
            subtask_queryset = SubPersonalTasksM2M.objects.values_list("subtask", flat=True).distinct()
            queryset = queryset.difference(subtask_queryset)
        return queryset


class MainPersonalTaskFilter(BaseFilterBackend):
    """Фильтрация главных задач."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('main'):
            # subtask_id_queryset = SubPersonalTasksM2M.objects.values_list("subtask__id", flat=True).distinct()
            # subtask_id_list = []
            # for subtask_id in enumerate(subtask_id_queryset):
            #     subtask_id_list.append(subtask_id["id"])
            # queryset.objects.exclude(id__in=subtask_id_list)
            subtask_queryset = SubPersonalTasksM2M.objects.values_list("subtask", flat=True).distinct()
            queryset = queryset.difference(subtask_queryset)
        return queryset


class ResponsibleTaskFilter(BaseFilterBackend):
    """Фильтрация задач по ответственным."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('responsible'):
            responsible_list = request.query_params.getlist('responsible')
            queryset = queryset.filter(responsible__id__in=responsible_list).distinct()
        return queryset


class OrganizationTaskFilter(BaseFilterBackend):
    """Фильтрация задач по организациям."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('organization'):
            org_list = request.query_params.getlist('organization')
            queryset = queryset.filter(organization__id__in=org_list).distinct()
        return queryset


class ActualTaskFilter(BaseFilterBackend):
    """Фильтрация задач по организациям."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('actual'):
            queryset = queryset.filter(deadline__gte=dt.now()).distinct()
        return queryset
