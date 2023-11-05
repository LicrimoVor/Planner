from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

User = get_user_model()


class TelegramView(APIView):
    """View для телеграма."""

    permission_classes = [IsAuthenticated,]

    def get(self, request, *args, **kwargs):
        """Возвращает url на привязку к телеграму."""

        user = request.user
        token_model, _ = Token.objects.get_or_create(user=user)
        return Response(data={"url_telegram": token_model.key}, status=status.HTTP_200_OK)
