from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins


class GetPostSet(mixins.RetrieveModelMixin,
                   mixins.CreateModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    """Viewset для Get-Post запросов"""
    pass


class GetSet(mixins.RetrieveModelMixin,
             mixins.ListModelMixin,
             GenericViewSet):
    """Viewset для Get запросов"""
    pass


class GetChangeSet(mixins.RetrieveModelMixin,
                   mixins.CreateModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    """Viewset для Get-Post-Patch-Put запросов"""
    pass
