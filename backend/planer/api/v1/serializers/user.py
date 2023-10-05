from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Сериализтор пользователей."""

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'last_name', 'first_name']
        # read_only_fields = ['email', 'username', 'last_name', 'first_name']

    def to_internal_value(self, data):
        if isinstance(data, int):
            return get_object_or_404(User, id=data)
        else:
            return super().to_internal_value(data)
