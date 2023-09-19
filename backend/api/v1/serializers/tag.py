from rest_framework import serializers
from django.shortcuts import get_object_or_404

from task.models import TagModel


class TagSerializer(serializers.ModelSerializer):
    """Сериализатор тегов."""

    class Meta:
        model = TagModel
        fields = ("id", "name", "slug", "color")
        read_only_fields = ("id", )

    def to_internal_value(self, data):
        print("!"*50)
        if isinstance(data, int):
            return get_object_or_404(TagModel, id=data)
        else:
            return super().to_internal_value(data)
