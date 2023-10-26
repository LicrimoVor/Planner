from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination

from space.models import SpaceModel
from ..permissions import SpaceAdminPermission, SpaceStaffPermission
from ..serializers.space import SpaceNotPermSerializer, SpacePermSerializer


class SpaceSet(ModelViewSet):
    """ViewSet модели организаций."""

    queryset = SpaceModel.objects.all()
    serializer_class = SpaceNotPermSerializer
    permission_classes = [IsAuthenticated&SpaceAdminPermission]
    filter_backends = (filters.SearchFilter,)
    pagination_class = (LimitOffsetPagination)
    search_fields = ("name", )

    def get_serializer(self, *args, **kwargs):
        """Возвращает эксзпляр сериализатора, в зависимости от прав perm_flag"""
        if len(args) > 0:
            inst = args[0]
        elif kwargs.get("instance"):
            inst = kwargs["instance"]
        if (self.kwargs.get("pk")
            and SpaceStaffPermission.has_object_permission(self.request, self, inst)):
            serializer_class = SpacePermSerializer
        else:
            serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        request.data["staff"] = request.user.id
        return super().create(request, *args, **kwargs)


class SpaceMeView(APIView, LimitOffsetPagination):
    """View для get-запрос получения своих организаций."""
    
    permission_classes = (IsAuthenticated, )

    def get_queryset(self, user):
        queryset = SpaceModel.objects.filter(staff__id=user.id)
        return queryset

    def get(self, request, *args, **kwargs):
        """Выдает список организаций пользователя."""

        user = request.user
        queryset = self.get_queryset(user)
        result = self.paginate_queryset(queryset, request, view=self)
        serializer = SpacePermSerializer(result,
                                         context={"request": request},
                                         many=True)
        return self.get_paginated_response(serializer.data)
