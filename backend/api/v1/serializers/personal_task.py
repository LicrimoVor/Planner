from rest_framework import serializers
from rest_framework import exceptions
from django.contrib.auth import get_user_model

from task.models import (PersonalTaskModel, TagModel,
                         StatusModel, )
from .user import UserSerializer
# from .tag import TagsField

User = get_user_model()


class SubRespSerializer(serializers.ModelSerializer):
    """Сериализатор персональных подзадач."""
    author = UserSerializer(read_only=True)

    class Meta:
        model = PersonalTaskModel
        fields = ("id", "name", "discription",
                  "author", "status", "deadline",
                  "tags")


class PersonalTaskSerializer(serializers.ModelSerializer):
    """Сериализатор персональных задач."""
    author = UserSerializer(User.objects.all(), read_only=True)
    subtasks = SubRespSerializer(many=True, required=False,)
    tags = serializers.PrimaryKeyRelatedField(
                     queryset=TagModel.objects.all(),
                     many=True, required=False,)
    status = serializers.PrimaryKeyRelatedField(
        queryset=StatusModel.objects.all()
    )
    deadline = serializers.DateTimeField(required=False,)

    class Meta:
        model = PersonalTaskModel
        fields = ("id", "name", "discription",
                  "author", "status", "deadline",
                  "subtasks", "tags")

    def validate_subtasks(self, attrs):
        author = self.context["request"].user
        for subtask in attrs:
            author_task = subtask.author
            if author != author_task:
                raise exceptions.ValidationError(f"Данная задача - {subtask.id}, не принадлежит вам!")
            if self.instance is not None:
                if self.instance.id == subtask.id:
                    raise exceptions.ValidationError(f"Не возможно задачу {subtask.id} сделать подзадачей {subtask.id}!")
        return super().validate(attrs)

    def create(self, validated_data):
        author = self.context["request"].user
        tags = validated_data.pop("tags") if validated_data.get("tags") is not None else []
        subtasks = validated_data.pop("subtasks") if validated_data.get("subtasks") is not None else []
        model = PersonalTaskModel.objects.create(author=author, **validated_data)
        model.tags.set(tags)
        model.subtasks.set(subtasks)
        return model

    def update(self, instance, validated_data):
        tags = validated_data.pop("tags") if validated_data.get("tags") is not None else []
        subtasks = validated_data.pop("subtasks") if validated_data.get("subtasks") is not None else []
        instance.tags.set(tags)
        instance.subtasks.set(subtasks)
        return super().update(instance, validated_data)
