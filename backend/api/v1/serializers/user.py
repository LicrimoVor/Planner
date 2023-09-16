from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Сериализтор пользователей."""

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'last_name', 'first_name']

    def to_internal_value(self, data):
        return super().to_internal_value(data)
    
    def to_representation(self, instance):
        return super().to_representation(instance)
