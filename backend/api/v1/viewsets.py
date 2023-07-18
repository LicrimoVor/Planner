from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins

class NotListSet(mixins.RetrieveModelMixin,
                 mixins.CreateModelMixin,
                 mixins.UpdateModelMixin,
                 mixins.DestroyModelMixin,
                 GenericViewSet):
    """Viewset без обработки get-list запросов (без id)"""
    pass
