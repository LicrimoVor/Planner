from rest_framework import filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response

from task.models import OrgTaskModel
from ..permissions import OrgPermission
from ..viewsets import NotListSet
from ..filters import (TagTaskFilter, StatusTaskFilter,
                       ActualTaskFilter, MainOrgTaskFilter,
                       ResponsibleTaskFilter)


class OrgTaskSet(ModelViewSet):
    """ViewSet задач организации."""

    queryset = OrgTaskModel.objects.all()
    # serializer_class = TagSerializer
    permission_classes = [IsAuthenticated&OrgPermission]
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,
                       MainOrgTaskFilter,
                       ResponsibleTaskFilter,)
    search_fields = ("name", )
    ordering_fields = ("deadline",)


class OrgSubTaskView(NotListSet):
    """ViewSet подзадач организации."""

    queryset = OrgTaskModel.objects.all()
    # serializer_class = TagSerializer
    permission_classes = [IsAuthenticated&OrgPermission]
    filter_backends = (filters.SearchFilter,
                       filters.OrderingFilter,
                       TagTaskFilter,
                       StatusTaskFilter,
                       ActualTaskFilter,
                       ResponsibleTaskFilter)
    search_fields = ("name", )
    ordering_fields = ("deadline",)


class HistoryView(APIView):
    """ViewSet подзадач организации."""
    permission_classes = [IsAuthenticated&OrgPermission]

    def get(self, request, *args, **kwargs):
        """Выдает список всех изменений."""

        user = request.user
        # queryset = self.get_queryset(user)
        # serializer = OrgPermSerializer(queryset,
        #                                context={"request": request})
        # return Response(serializer.data,
        #                 status=status.HTTP_201_CREATED)

class HistoryTaskView(APIView):
    """ViewSet подзадач организации."""
    permission_classes = [IsAuthenticated&OrgPermission]

    def get(self, request, *args, **kwargs):
        """Выдает список изменений задачи."""

        user = request.user
        # queryset = self.get_queryset(user)
        # serializer = OrgPermSerializer(queryset,
        #                                context={"request": request})
        # return Response(serializer.data,
        #                 status=status.HTTP_201_CREATED)

