from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import status
from rest_framework.response import Response

from organizations.models import OrgModel
from ..permissions import OrgAdminPermission, OrgInfPermission
from ..serializers.organizations import OrgNotPermSerializer, OrgPermSerializer


class OrganizationSet(ModelViewSet):
    """ViewSet модели организаций."""

    queryset = OrgModel.objects.all()
    serializer_class = OrgNotPermSerializer
    permission_classes = [IsAuthenticated&OrgAdminPermission]
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name", )

    def get_serializer(self, *args, **kwargs):
        """Возвращает эксзпляр сериализатора, в зависимости от прав perm_flag"""
        if (self.kwargs.get("pk") 
            and OrgInfPermission.has_object_permission(self.request, self, args[0])
            or self.request.method=="POST"):
            serializer_class = OrgPermSerializer
        else:
            serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    def list(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


class OrganizationMeView(APIView, LimitOffsetPagination):
    """View для get-запрос получения своих организаций."""
    permission_classes = (IsAuthenticated, )

    def get_queryset(self, user):
        queryset = OrgModel.objects.filter(staff__id=user.id)
        return queryset

    def get(self, request, *args, **kwargs):
        """Выдает список организаций пользователя."""

        user = request.user
        queryset = self.get_queryset(user)
        result = self.paginate_queryset(queryset, request, view=self)
        serializer = OrgPermSerializer(result,
                                       context={"request": request},
                                       many=True)
        return self.get_paginated_response(serializer.data)
