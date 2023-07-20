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
        staff_list = validated_data.pop("staff")
        model = OrgModel(admin=admin, **validated_data)
        staff_model = UserOrgModel(
                organization=model,
                user=admin
        )
        staff_models = [staff_model, ]
        for user in staff_list:
            if user.id == admin.id:
                continue
            staff_model = UserOrgModel(
                organization=model,
                user=user,
            )
            staff_models.append(staff_model)
        model.save()
        UserOrgModel.objects.bulk_create(staff_models)
        return model

    def update(self, instance, validated_data):
        admin = self.context["request"].user
        staff_list = validated_data.pop("staff")
        if admin not in staff_list:
            staff_list.append(admin)
        instance.staff.set(staff_list)
        return super().update(instance, validated_data)
