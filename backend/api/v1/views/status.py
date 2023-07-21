from rest_framework import filters
from rest_framework.viewsets import ModelViewSet

from task.models import StatusModel
from ..permissions import ModifyAdminPermission
from ..serializers.status import StatusSerializer


class StatusSet(ModelViewSet):
    """ViewSet модели статусов."""

    queryset = StatusModel.objects.all()
    serializer_class = StatusSerializer
    permission_classes = (ModifyAdminPermission, )
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name", "slug")
