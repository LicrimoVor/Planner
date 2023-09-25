import logging

from rest_framework import serializers
from django.shortcuts import get_object_or_404

from task.models import StatusModel

logger = logging.getLogger(__name__)


class StatusSerializer(serializers.ModelSerializer):
    """Сериализатор статусов."""

    class Meta:
        model = StatusModel
        fields = ("id", "name", "slug", "color")
        read_only_fields = ("id", )

    def to_internal_value(self, data):
        logger.info(data)
        if isinstance(data, int):
            return get_object_or_404(StatusModel, id=data)
        else:
            return super().to_internal_value(data)
