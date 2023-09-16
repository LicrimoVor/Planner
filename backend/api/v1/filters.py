from django.utils import timezone
from rest_framework.filters import BaseFilterBackend

from space.models import SpaceModel
from task.models import SubPersonalTasksM2M, SubSpaceTasksM2M


class TagTaskFilter(BaseFilterBackend):
    """Фильтрация задач по тегу."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('tags'):
            tags_list = request.query_params.getlist('tags')
            for tag in tags_list:
                queryset = queryset.filter(tags__slug=tag).distinct()
        return queryset


class StatusTaskFilter(BaseFilterBackend):
    """Фильтрация задач по статусу."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('status'):
            status_list = request.query_params.getlist('status')
            queryset = queryset.filter(status__slug__in=status_list).distinct()
        return queryset


class MainSpaceTaskFilter(BaseFilterBackend):
    """Фильтрация главных задач."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('main'):
            queryset_id = SubSpaceTasksM2M.objects.values_list("subtask", flat=True).distinct()
            queryset = queryset.exclude(id__in=queryset_id)
        return queryset


class MainPersonalTaskFilter(BaseFilterBackend):
    """Фильтрация главных задач."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('main'):
            queryset_id = SubPersonalTasksM2M.objects.values_list("subtask", flat=True).distinct()
            queryset = queryset.exclude(id__in=queryset_id)
        return queryset


class ResponsibleTaskFilter(BaseFilterBackend):
    """Фильтрация задач по ответственным."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('responsible'):
            responsible_list = request.query_params.getlist('responsible')
            queryset = queryset.filter(responsibles__id__in=responsible_list).distinct()
        return queryset


class SpaceTaskFilter(BaseFilterBackend):
    """Фильтрация задач по пространствам."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('space'):
            space_list = request.query_params.getlist('space')
            space_list = list(map(int, space_list))
            queryset = queryset.filter(space__id__in=space_list).distinct()
        return queryset


class ActualTaskFilter(BaseFilterBackend):
    """Фильтрация задач по организациям."""

    def filter_queryset(self, request, queryset, view):
        if request.query_params.get('actual'):
            queryset = queryset.filter(deadline__gte=timezone.now()).distinct()
        return queryset
