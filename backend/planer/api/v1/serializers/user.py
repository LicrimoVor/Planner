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

    avatar = Base64ImageField(allow_null=False, required=False, use_url=False)
    user = UserSerializer(User.objects.all(), read_only=True,)

    class Meta:
        model = Profile
        fields = ['time_zone', 'color', 'avatar', 'user']

    def create(self, validated_data):
        self.validated_data['user'] = self.context["request"].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if validated_data.get("avatar") == "delete":
            validated_data.pop("avatar")
            instance.avatar = Profile.avatar.field.default
        return super().update(instance, validated_data)


class UserColorSerializer(serializers.ModelSerializer):
    """Сериализтор пользователей + их цвет."""

    color = serializers.CharField(source="profile.color", read_only=True,)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'last_name', 'first_name', 'color']

    def to_internal_value(self, data):
        if isinstance(data, int):
            return get_object_or_404(User, id=data)
        else:
            return super().to_internal_value(data)

