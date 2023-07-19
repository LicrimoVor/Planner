from rest_framework import filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from organizations.models import OrgModel
from ..permissions import OrgAdminPermission, OrgPermission
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
        if OrgPermission.has_object_permission(self.request, self, args[0]):
            serializer_class = OrgPermSerializer
        else:
            serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)


class OrganizationMeView(APIView):
    """View для get-запрос получения своих организаций."""
    permission_classes = (IsAuthenticated, )

    def get_queryset(self, user):
        queryset = OrgModel.objects.filter(staff__user__id=user.id)
        return queryset

    def get(self, request, *args, **kwargs):
        """Выдает список организаций пользователя."""

        user = request.user
        queryset = self.get_queryset(user)
        serializer = OrgPermSerializer(queryset,
                                       context={"request": request})
        return Response(serializer.data,
                        status=status.HTTP_201_CREATED)
