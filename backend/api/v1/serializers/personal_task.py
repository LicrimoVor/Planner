from rest_framework import serializers

from task.models import PersonalTaskModel
from .user import UserSerializer


class OrgNotPermSerializer(serializers.ModelSerializer):
    """Сериализатор статусов."""
    author = UserSerializer()

    class Meta:
        model = PersonalTaskModel
        fields = ("id", "name", "discription",
                  "author", "status", "deadline",
                  "subtasks", "tags")
