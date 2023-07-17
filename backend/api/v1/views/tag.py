from rest_framework import filters
from rest_framework.viewsets import ModelViewSet

from task.models import TagModel 
from ..permissions import ModifyAdminPermission


class TagSet(ModelViewSet):
    """ViewSet модели тегов."""

    queryset = TagModel.objects.all()
    # serializer_class = TagSerializer
    permission_classes = (ModifyAdminPermission, )
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name",)
