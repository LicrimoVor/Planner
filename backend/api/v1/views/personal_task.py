from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView

from task.models import PersonalTaskModel, OrgTaskModel
from ..permissions import OrgAdminPermission, AuthorPermission
from ..viewsets import NotListSet
from ..filters import (TagTaskFilter, StatusTaskFilter,
                       ActualTaskFilter, MainPersonalTaskFilter,
                       OrganizationTaskFilter)


class PersonalTaskSet(ModelViewSet):
    """ViewSet персональных задач."""

    queryset = PersonalTaskModel.objects.all()
    # serializer_class = TagSerializer
    permission_classes = [IsAuthenticated&AuthorPermission]
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,
                       MainPersonalTaskFilter)
    search_fields = ("name", )
    ordering_fields = ("deadline",)


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


class PersonalSubTaskSet(NotListSet):
    """ViewSet персональных подзадач."""

    queryset = PersonalTaskModel.objects.all()
    # serializer_class = TagSerializer
    permission_classes = [IsAuthenticated&AuthorPermission]
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,)
    search_fields = ("name", )
    ordering_fields = ("deadline",)
