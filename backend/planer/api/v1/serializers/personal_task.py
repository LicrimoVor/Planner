import logging
import datetime as dt

from rest_framework import serializers
from django.contrib.auth import get_user_model

from task.models import PersonalTaskModel
from .user import UserSerializer
from .tag import TagSerializer
from .status import StatusSerializer

User = get_user_model()


logger = logging.getLogger(__name__)


class PersonalTaskSerializer(serializers.ModelSerializer):
    """Сериализатор персональных задач."""
    author = UserSerializer(User.objects.all(), read_only=True)
    tags = TagSerializer(many=True, required=False)
    status = StatusSerializer(required=False)
    deadline = serializers.DateTimeField(required=False,)

    class Meta:
        model = PersonalTaskModel
        fields = ("id", "name", "description",
                  "author", "status", "deadline",
                  "tags")

    def create(self, validated_data):
        author = self.context["request"].user
        tags = validated_data.pop("tags") if validated_data.get("tags") is not None else []
        if validated_data.get("deadline") is not None:
            validated_data["deadline"] -= dt.timedelta(hours=author.time_zone)
        model = PersonalTaskModel.objects.create(author=author, **validated_data)
        model.tags.set(tags)
        return model

    def update(self, instance, validated_data):
        if self.context['request'].method == "PUT":
            for field in ["name", "description", "status", "deadline", "tags"]:
                validated_data.setdefault(field, None)
        
        if validated_data.get("tags", 0) != 0:
            values_field = validated_data.pop("tags")
            if values_field is None:
                values_field = []
            instance.tags.set(values_field)

        if validated_data.get("deadline") is not None:
            validated_data["deadline"] -= dt.timedelta(hours=self.context["request"].user.time_zone)

        logger.info(validated_data)
        for name, value in validated_data.items():
            setattr(instance, name, value)

        instance.save()
        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data.get("deadline") is not None:
            datetime = instance.deadline + dt.timedelta(hours=instance.author.time_zone)
            data["deadline"] = datetime.strftime('%H:%M - %d.%m.%Y') + f" (+{instance.author.time_zone})"
        return data
