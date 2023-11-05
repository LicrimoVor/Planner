from django.contrib.auth import authenticate, logout, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


class LoginView(APIView):
    permission_classes = (~IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(password=password, username=username)
        if user is None:
            return Response(status=status.HTTP_400_BAD_REQUEST, headers={
                'access-control-allow-origin': "http://localhost:3000",
                'access-control-allow-credentials': "true",
            })
        login(request, user)
        return Response(data={"csrfToken": request.stream.META.get("CSRF_COOKIE")}, status=status.HTTP_201_CREATED)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(status=status.HTTP_200_OK)
