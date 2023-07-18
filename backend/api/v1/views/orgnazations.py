from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from organizations.models import OrgModel
from ..permissions import OrgAdminPermission


class OrganizationSet(ModelViewSet):
    """ViewSet модели организаций."""

    queryset = OrgModel.objects.all()
    # serializer_class = TagSerializer
    permission_classes = [IsAuthenticated&OrgAdminPermission]
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name", )


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
        # serializer = ShoppingCartSerializer(shopping_cart,
        #                                     context={"request": request})
        # return Response(serializer.data,
        #                 status=status.HTTP_201_CREATED)
