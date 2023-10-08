from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .abstract import Base64ImageField

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Сериализтор пользователей."""

    avatar = Base64ImageField(allow_null=False, required=False,)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'last_name', 'first_name', 'color', 'time_zone', 'avatar']
        # read_only_fields = ['email', 'username', 'last_name', 'first_name']

    def to_internal_value(self, data):
        if isinstance(data, int):
            return get_object_or_404(User, id=data)
        else:
            return super().to_internal_value(data)
