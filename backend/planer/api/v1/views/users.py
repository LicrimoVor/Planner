from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.postgres.search import SearchVector

from ..serializers.user import UserSerializer, ProfileSerializer

User = get_user_model()


class UsersView(ListAPIView, LimitOffsetPagination):
    """View для пользователя."""

    permission_classes = [IsAuthenticated,]

    def get_queryset(self, search_field):
        queryset = User.objects.annotate(
            search=SearchVector('first_name', 'last_name', 'username')
        ).filter(search=search_field)
        return queryset

    def get(self, request, *args, **kwargs):
        search_field = kwargs.get("search_field")
        queryset = self.get_queryset(search_field)
        queryset = self.paginate_queryset(queryset, request, view=self)
        serializer = UserSerializer(queryset, 
                                    context={"request": request},
                                    many=True,)
        return self.get_paginated_response(serializer.data)


class ProfileView(APIView):
    """View для профиля пользователя."""

    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        if kwargs.get("user_id"):
            user = get_object_or_404(User, id=kwargs.get("user_id"))
        else:
            user = request.user
        serializer = ProfileSerializer(user.profile)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def update(self, request, partial: bool) -> dict:
        user = request.user
        data_user = {}
        for field in UserSerializer.Meta.fields:
            if request.data.get(field):
                data_user[field] = request.data.pop(field)
        serializer_user = UserSerializer(user, data=data_user, partial=partial)
        serializer_profile = ProfileSerializer(user.profile, data=request.data, partial=partial)
        serializer_user.is_valid(raise_exception=True)
        serializer_profile.is_valid(raise_exception=True)
        serializer_user.save()
        serializer_profile.save()
        return serializer_profile.data

    def patch(self, request, *args, **kwargs):
        if kwargs.get("user_id"):
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        data = self.update(request, True)
        return Response(data=data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        if kwargs.get("user_id"):
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        data = self.update(request, False)
        return Response(data=data, status=status.HTTP_200_OK)
