from rest_framework import serializers
from rest_framework import exceptions
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from task.models import PersonalTaskModel
from .user import UserSerializer
from .tag import TagSerializer
from .status import StatusSerializer

User = get_user_model()


class SubRespSerializer(serializers.ModelSerializer):
    """Сериализатор персональных подзадач."""
    author = UserSerializer(read_only=True)

    class Meta:
        model = PersonalTaskModel
        fields = ("id", "name", "discription",
                  "author", "status", "deadline",
                  "tags")

    def to_internal_value(self, id):
        return get_object_or_404(PersonalTaskModel, id=id)


class PersonalTaskSerializer(serializers.ModelSerializer):
    """Сериализатор персональных задач."""
    author = UserSerializer(User.objects.all(), read_only=True)
    subtasks = SubRespSerializer(many=True, required=False,)
    tags = TagSerializer(many=True, required=False)
    status = StatusSerializer()
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
                raise exceptions.ValidationError(f"Данная задача - {subtask.id}, " 
                                                 + "не принадлежит вам!")
            if self.instance is not None:
                if self.instance.id == subtask.id:
                    raise exceptions.ValidationError(f"Не возможно задачу {subtask.id} "
                                                      + f"сделать подзадачей {subtask.id}!")
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
        
        for name, value in validated_data.items():
            setattr(instance, name, value)

        instance.tags.set(tags)
        instance.subtasks.set(subtasks)
        instance.save()
        return instance
