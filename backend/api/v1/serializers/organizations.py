from rest_framework import serializers
from django.contrib.auth import get_user_model

from organizations.models import OrgModel, UserOrgModel
from .user import UserSerializer

User = get_user_model()


class OrgNotPermSerializer(serializers.ModelSerializer):
    """Сериализатор организаций общий. Реализует Post/Get запросы."""
    admin = UserSerializer()

    class Meta:
        model = OrgModel
        fields = ("id", "name", "admin")


class StaffField(serializers.PrimaryKeyRelatedField):

    def to_representation(self, value):
        serializer = UserSerializer(value)
        return serializer.data


class OrgPermSerializer(serializers.ModelSerializer):
    """
    Сериализатор организаций с доступом для Put/Patch/Del запросов.
    Так же при Get запросе выдает дополнительную информацию.
    """
    admin = UserSerializer(read_only=True)
    staff = StaffField(queryset=User.objects.all(), many=True)

    class Meta:
        model = OrgModel
        fields = ("id", "name", "admin", "staff")

    def create(self, validated_data):
        admin = self.context["request"].user
        if validated_data.get("staff"):
            staff_list = validated_data.pop("staff")
        else:
            staff_list = []
        if admin.id not in staff_list:
            staff_list.append(admin.id)
        model = OrgModel.objects.create(admin=admin, **validated_data)
        model.staff.set(staff_list)
        return model

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
