from rest_framework import serializers
from django.shortcuts import get_object_or_404

from task.models import TagModel


class TagSerializer(serializers.ModelSerializer):
    """Сериализатор тегов."""

    class Meta:
        model = TagModel
        fields = ("id", "name", "slug", "color")

    def to_internal_value(self, id):
        return get_object_or_404(TagModel, id=id)
