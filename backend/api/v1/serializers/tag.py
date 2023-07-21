from rest_framework import serializers

from task.models import TagModel


class TagSerializer(serializers.ModelSerializer):
    """Сериализатор тегов."""

    class Meta:
        model = TagModel
        fields = ("id", "name", "slug", "color")
