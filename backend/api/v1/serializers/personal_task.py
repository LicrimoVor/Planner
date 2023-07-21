from rest_framework import serializers
from rest_framework import exceptions
from django.contrib.auth import get_user_model

from task.models import PersonalTaskModel, TagModel, StatusModel
from .user import UserSerializer
from .tag import TagModel

User = get_user_model()


class SubRespSerializer(serializers.ModelSerializer):
    """Сериализатор персональных подзадач."""
    author = UserSerializer(read_only=True)

    class Meta:
        model = PersonalTaskModel
        fields = ("id", "name", "discription",
                  "author", "status", "deadline",
                  "tags")


class SubTasksField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        serializer = SubRespSerializer(value)
        return serializer.data


class TagsField(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        serializer = TagModel(value)
        return serializer.data


class PersonalTaskSerializer(serializers.ModelSerializer):
    """Сериализатор персональных задач."""
    author = UserSerializer(User.objects.all(), read_only=True)
    subtasks = SubTasksField(queryset=PersonalTaskModel.objects.all(),
                             many=True, required=False,)
    tags = TagsField(queryset=TagModel.objects.all(),
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

    def create(self, validated_data):
        author = self.context["request"].user
        if validated_data.get("tags"):
            tags = validated_data.pop("tags")
        else:
            tags = []
        if validated_data.get("subtasks"):
            subtasks = validated_data.pop("subtasks")
            for subtask in subtasks:
                author_task = subtask.author
                if author != author_task:
                    raise exceptions.ValidationError("Данная задача не принадлежит вам!")
        else:
            subtasks = []
        model = PersonalTaskModel.objects.create(author=author, **validated_data)
        model.tags.set(tags)
        model.subtasks.set(subtasks)
        return model

    def update(self, instance, validated_data):
        author = self.context["request"].user
        if validated_data.get("tags"):
            tags = validated_data.pop("tags")
        else:
            tags = []
        if validated_data.get("subtasks"):
            subtasks = validated_data.pop("subtasks")
            for subtask in subtasks:
                author_task = subtask.author
                if author != author_task:
                    raise exceptions.ValidationError(subtasks, )
        else:
            subtasks = []
        instance.tags.set(tags)
        instance.subtasks.set(subtasks)
        return super().update(instance, validated_data)


class SubPersonalTaskSerializer(serializers.ModelSerializer):
    """Сериализатор персональных подзадач."""
    author = UserSerializer(User.objects.all(), read_only=True)
    subtasks = SubTasksField(queryset=PersonalTaskModel.objects.all(),
                             many=True, required=False,)
    tags = TagsField(queryset=TagModel.objects.all(),
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

    def create(self, validated_data):
        author = self.context["request"].user
        if validated_data.get("tags"):
            tags = validated_data.pop("tags")
        else:
            tags = []
        if validated_data.get("subtasks"):
            subtasks = validated_data.pop("subtasks")
        else:
            subtasks = []
        model = PersonalTaskModel.objects.create(author=author, **validated_data)
        model.tags.set(tags)
        model.subtasks.set(subtasks)
        return model