from django.contrib.auth import authenticate, logout, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from djoser import signals
from djoser.conf import settings
from djoser.compat import get_user_email

from core.utils import CeleryActivationEmail
from api.v1.serializers.user import UserSerializer


class LoginView(APIView):
    """Авторизация пользователя по логину и почте."""
    permission_classes = (~IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        login_field: str = request.data.get("login")
        password = request.data.get("password")
    
        if login_field is None or password is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
        username = login_field if '@' not in login_field else None
        email = login_field if username is None else None
        user = authenticate(password=password, username=username, email=email)

        if user is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if not user.is_active:
            signals.user_registered.send(
                sender=self.__class__, user=user, request=self.request
            )
            context = {"user": user}
            to = [get_user_email(user)]
            if settings.SEND_ACTIVATION_EMAIL:
                CeleryActivationEmail(request, context).send(to)
            return Response(data={"email": user.email}, status=status.HTTP_200_OK)
        
        login(request, user, backend='users.backend.UserBackend')
        return Response(status=status.HTTP_201_CREATED)


class LogoutView(APIView):
    """Выход из учетной записи пользователя."""
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class RegistrationView(APIView):
    """Регистрация учетной записи пользователя."""
    permission_classes = (~IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        signals.user_registered.send(
            sender=self.__class__, user=user, request=self.request
        )
        
        if settings.SEND_ACTIVATION_EMAIL:
            context = {"user": user}
            to = [get_user_email(user)]
            CeleryActivationEmail(request, context).send(to)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ResetPassword(APIView):
    """Восстановление пароля."""
    permission_classes = settings.PERMISSIONS.password_reset

    def post(self, request, *args, **kwargs):
        serializer = settings.SERIALIZERS.password_reset(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.get_user()

        if user:
            context = {"user": user}
            to = [get_user_email(user)]
            settings.EMAIL.password_reset(self.request, context).send(to)

        return Response(status=status.HTTP_204_NO_CONTENT)
