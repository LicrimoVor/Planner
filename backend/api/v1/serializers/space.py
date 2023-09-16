
from rest_framework import serializers
from django.contrib.auth import get_user_model

from space.models import SpaceModel
from .user import UserSerializer



User = get_user_model()


class SpaceNotPermSerializer(serializers.ModelSerializer):
    """Сериализатор пространств общий. Реализует Post/Get запросы."""
    admin = UserSerializer(read_only=True)

    class Meta:
        model = SpaceModel
        fields = ("id", "name", "admin")

    def create(self, validated_data):
        admin = self.context["request"].user
        model = SpaceModel.objects.create(admin=admin, **validated_data)
        return model


class SpacePermSerializer(serializers.ModelSerializer):
    """
    Сериализатор пространств с доступом для Put/Patch/Del запросов.
    Так же при Get запросе выдает дополнительную информацию.
    """
    admin = UserSerializer(read_only=True)
    staff = UserSerializer(many=True)

    class Meta:
        model = SpaceModel
        fields = ("id", "name", "admin", "staff")

    def update(self, instance, validated_data):
        admin = self.context["request"].user
        if validated_data.get("staff"):
            staff_list = validated_data.pop("staff")
        else:
            staff_list = []
        if admin not in staff_list:
            staff_list.append(admin)
        instance.staff.set(staff_list)
        return super().update(instance, validated_data)
