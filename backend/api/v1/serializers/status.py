from rest_framework import serializers

from task.models import StatusModel


class StatusSerializer(serializers.ModelSerializer):
    """Сериализатор статусов."""

    class Meta:
        model = StatusModel
        fields = ("id", "name", "slug", "color")
