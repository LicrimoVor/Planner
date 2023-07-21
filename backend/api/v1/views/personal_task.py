from rest_framework import filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response


from task.models import PersonalTaskModel, OrgTaskModel, SubPersonalTasksM2M
from ..permissions import OrgAdminPermission, AuthorPermission
from ..filters import (TagTaskFilter, StatusTaskFilter,
                       ActualTaskFilter, MainPersonalTaskFilter,
                       OrganizationTaskFilter)
from ..serializers.personal_task import PersonalTaskSerializer


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
        queryset = PersonalTaskModel.objects.filter(author=author)
        return queryset


class OrganizationTaskMeSet(ListAPIView):
    """
    ViewSet задач организаций,
    в которых пользователь отмечен, как ответственный
    """

    queryset = OrgTaskModel.objects.all()
    # serializer_class = TagSerializer
    permission_classes = [IsAuthenticated,]
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,
                       MainPersonalTaskFilter,)
    search_fields = ("name", )
    ordering_fields = ("deadline",)


class PersonalSubTaskView(APIView, LimitOffsetPagination):
    """View персональных подзадач."""
    permission_classes = [IsAuthenticated&AuthorPermission]

    def get_queryset(self, task_id):
        queryset_id = PersonalTaskModel.objects.filter(id=task_id).values_list("main_task_pers__subtask", flat=True)
        queryset = PersonalTaskModel.objects.filter(id__in=queryset_id)
        return queryset

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset(**kwargs)
        result = self.paginate_queryset(queryset, request, view=self)
        serializer = PersonalTaskSerializer(
            result,
            context={"request": request},
            many=True
        )
        return self.get_paginated_response(serializer.data)

    def post(self, request, *args, **kwargs):
        task_id = kwargs.get("task_id")
        serializer = PersonalTaskSerializer(
            data=request.data, context={"request": request, "task_id":task_id},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        task = PersonalTaskModel.objects.get(id=task_id)
        SubPersonalTasksM2M.objects.create(task=task, subtask=serializer.instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
