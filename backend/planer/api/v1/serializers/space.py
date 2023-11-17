from rest_framework import serializers
from django.contrib.auth import get_user_model

from space.models import SpaceModel, UserSpaceModel
from .user import UserSerializer, UserColorSerializer

from .abstract import Base64ImageField


User = get_user_model()


class SpaceNotPermSerializer(serializers.ModelSerializer):
    """Сериализатор пространств общий. Реализует Post/Get запросы."""
    admin = UserSerializer(read_only=True)
    avatar = Base64ImageField(allow_null=False, required=False, use_url=False)
    favorite = serializers.SerializerMethodField()

    class Meta:
        model = SpaceModel
        fields = ("id", "name", "admin", "avatar", "favorite")

    def create(self, validated_data):
        admin = self.context["request"].user
        model = SpaceModel.objects.create(admin=admin, **validated_data)
        model.staff.set([admin.id,])
        return model

    def get_favorite(self, space, *args, **kwargs):
        user = self.context.get("request").user
        staff_user = UserSpaceModel.objects.get(space=space, user=user)
        return staff_user.favorite


class SpacePermSerializer(serializers.ModelSerializer):
    """
    Сериализатор пространств с доступом для Put/Patch/Del запросов.
    Так же при Get запросе выдает дополнительную информацию.
    """
    admin = UserSerializer(read_only=True)
    staff = UserColorSerializer(many=True)
    avatar = Base64ImageField(allow_null=False, required=False, use_url=False)
    favorite = serializers.SerializerMethodField()
    
    class Meta:
        model = SpaceModel
        fields = ("id", "name", "admin", "staff", "avatar", "favorite")

    def update(self, instance, validated_data):
        user = self.context["request"].user
        if validated_data.get("staff"):
            staff_list = validated_data.pop("staff")
        else:
            staff_list = []
        if user.id not in staff_list:
            staff_list.append(user)
        if self.initial_data.get("favorite") is not None:
            staff_model = UserSpaceModel.objects.get(space=self.instance, user=user)
            staff_model.favorite = self.initial_data.get("favorite")
            staff_model.save()
        instance.staff.set(staff_list)
        return super().update(instance, validated_data)

    def validate_favorite(self, attrs):
        if not isinstance(attrs, bool):
            raise Exception()

    def get_favorite(self, space, *args, **kwargs):
        user = self.context.get("request").user
        staff_user = UserSpaceModel.objects.get(space=space, user=user)
        return staff_user.favorite

    def to_internal_value(self, data):
        if data.get("favorite") is not None:
            self.validate_favorite(data.get("favorite"))
        return super().to_internal_value(data)
