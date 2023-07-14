from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import filters, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import (IsAuthenticatedOrReadOnly,
                                        IsAuthenticated)
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from task.models import (TagModel, StatusModel, TagOrgTaskModel,
                         TagPersonalTaskModel, SubOrgTasksM2M,
                         SubPersonalTasksM2M, PersonalTaskModel, OrgTaskModel,
                         ResponsibleOrgTasks,)
from organizations.models import OrgModel, UserOrgModel
from .viewsets import GetPostSet, GetSet, GetChangeSet
from .permissions import ModifyAdminPermission, OrgAdminPermission, OrgPermission

User = get_user_model()


class TagSet(ModelViewSet):
    """ViewSet модели тегов."""

    queryset = TagModel.objects.all()
    # serializer_class = TagSerializer
    permission_classes = (ModifyAdminPermission, )
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name",)


class StatusSet(ModelViewSet):
    """ViewSet модели статусов."""

    queryset = StatusModel.objects.all()
    # serializer_class = TagSerializer
    permission_classes = (ModifyAdminPermission, )
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name", )


class OrganizationSet(ModelViewSet):
    """ViewSet модели организаций."""

    queryset = OrgModel.objects.all()
    # serializer_class = TagSerializer
    permission_classes = [OrgAdminPermission&IsAuthenticated]
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name", )


class OrganizationGetMe(APIView):
    """View для get-запрос получения своих организаций."""
    permission_classes = (IsAuthenticated, )
    

    def get(self, request, *args, **kwargs):
        """Выдает список организаций пользователя."""

        user = request.user
        # serializer = ShoppingCartSerializer(shopping_cart,
        #                                     context={"request": request})
        # return Response(serializer.data,
        #                 status=status.HTTP_201_CREATED)
