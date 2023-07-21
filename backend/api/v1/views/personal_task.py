from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination

from task.models import PersonalTaskModel, OrgTaskModel
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

    queryset = PersonalTaskModel.objects.all()
    # serializer_class = TagSerializer
    permission_classes = [IsAuthenticated&AuthorPermission]
    search_fields = ("name", )
    ordering_fields = ("deadline",)

    def list(self, request, *args, **kwargs):
        pass
    
    def post(self, request, *args, **kwargs):
        pass
