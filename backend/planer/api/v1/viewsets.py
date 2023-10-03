from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins

class GetPostSet(mixins.ListModelMixin,
                 mixins.CreateModelMixin,
                 GenericViewSet):
    """Viewset, обрабатывающий post и get-list запросы"""
    pass
