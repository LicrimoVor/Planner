from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .abstract import Base64ImageField
from users.models import Profile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Сериализтор пользователей."""

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'last_name', 'first_name']

    def create(self, validated_data):
        user = super().create(validated_data)
        profile = Profile.objects.create(user=user)
        profile.save()
        return user

    def to_internal_value(self, data):
        if isinstance(data, int):
            return get_object_or_404(User, id=data)
        else:
            return super().to_internal_value(data)


class ProfileSerializer(serializers.ModelSerializer):
    """Сериализтор профиля пользователей."""

    avatar = Base64ImageField(allow_null=False, required=False,)
    user = UserSerializer(User.objects.all(), read_only=True,)

    class Meta:
        model = Profile
        fields = ['time_zone', 'color', 'avatar', 'user']
