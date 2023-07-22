from rest_framework import serializers
from rest_framework import exceptions
from django.contrib.auth import get_user_model

from task.models import (OrgTaskModel, TagModel,
                         StatusModel,)
from organizations.models import OrgModel
from .user import UserSerializer
from .tag import TagsField
from .organizations import OrgNotPermSerializer

User = get_user_model()


class ResponsibleFiled(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        serializer = UserSerializer(value)
        return serializer.data


class SubRespSerializer(serializers.ModelSerializer):
    """Сериализатор подзадач организации."""
    author = UserSerializer(read_only=True)
    responsibles = ResponsibleFiled(queryset=User.objects.all(), many=True)

    class Meta:
        model = OrgTaskModel
        fields = ("id", "name", "discription",
                  "author", "status", "deadline",
                  "tags", "responsibles")


class SubTasksField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        serializer = SubRespSerializer(value)
        return serializer.data


class OrgTaskSerializer(serializers.ModelSerializer):
    """Сериализатор задач организации."""
    author = UserSerializer(User.objects.all(), read_only=True)
    responsibles = ResponsibleFiled(queryset=User.objects.all(),
                                    many=True, required=False)
    subtasks = SubTasksField(queryset=OrgTaskModel.objects.all(),
                             many=True, required=False,)
    tags = TagsField(queryset=TagModel.objects.all(),
                     many=True, required=False,)
    status = serializers.PrimaryKeyRelatedField(
        queryset=StatusModel.objects.all()
    )
    deadline = serializers.DateTimeField(required=False,)
    organization = OrgNotPermSerializer(read_only=True)

    class Meta:
        model = OrgTaskModel
        fields = ("id", "name", "discription",
                  "author", "status", "deadline",
                  "subtasks", "tags", "responsibles",
                  "organization",)

    def validate_subtasks(self, attrs):
        for subtask in attrs:
            if self.instance is not None:
                if self.instance.id == subtask.id:
                    raise exceptions.ValidationError(f"Не возможно задачу {subtask.id} сделать подзадачей {subtask.id}!")
        return super().validate(attrs)

    def validate_responsibles(self, attrs):
        staff = self.context["organization_model"].staff.all()
        for user in attrs:
            if user not in staff:
                raise exceptions.ValidationError(f"Пользователь {user.id} не состоит в организации.")
        return super().validate(attrs)

    def create(self, validated_data):
        author = self.context["request"].user
        organization = self.context["organization_model"]
        tags = validated_data.pop("tags") if validated_data.get("tags") is not None else []
        subtasks = validated_data.pop("subtasks") if validated_data.get("subtasks") is not None else []
        responsibles = validated_data.pop("responsibles") if validated_data.get("responsibles") is not None else []
        model = OrgTaskModel.objects.create(organization=organization,
                                            author=author, **validated_data)
        model.responsibles.set(responsibles)
        model.tags.set(tags)
        model.subtasks.set(subtasks)
        return model

    def update(self, instance, validated_data):
        tags = validated_data.pop("tags") if validated_data.get("tags") is not None else []
        subtasks = validated_data.pop("subtasks") if validated_data.get("subtasks") is not None else []
        responsible = validated_data.pop("responsible") if validated_data.get("responsible") is not None else []
        instance.responsibles.set(responsible)
        instance.tags.set(tags)
        instance.subtasks.set(subtasks)
        return super().update(instance, validated_data)


class HistorySerializer(serializers.Serializer):
    """Сериализатор истории изменений задч."""
    author = serializers.SerializerMethodField(read_only=True)
    datetime = serializers.SerializerMethodField(read_only=True)
    name = serializers.SerializerMethodField(read_only=True)
    action = serializers.SerializerMethodField(read_only=True)

    def get_author(self, obj):
        serializer = UserSerializer(obj.author)
        return serializer.data

    def get_datetime(self, obj):
        return obj.history_date.isoformat()
    
    def get_name(self, obj):
        return obj.instance.name
    
    def get_action(self, obj):
        return obj.get_history_type_display()
