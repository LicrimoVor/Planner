from rest_framework import serializers
from rest_framework import exceptions
from django.contrib.auth import get_user_model

from task.models import SpaceTaskModel
from .user import UserSerializer
from .tag import TagSerializer
from .status import StatusSerializer
from .space import SpaceNotPermSerializer

User = get_user_model()


class SpaceTaskSerializer(serializers.ModelSerializer):
    """Сериализатор задач пространств."""
    author = UserSerializer(read_only=True)
    responsibles = UserSerializer(many=True, required=False)
    subtasks = serializers.PrimaryKeyRelatedField(
        queryset = SpaceTaskModel.objects.all(),
        many=True, required=False,
    )
    tags = TagSerializer(many=True, required=False)
    status = StatusSerializer(required=False)
    deadline = serializers.DateTimeField(required=False,)
    space = SpaceNotPermSerializer(read_only=True)

    class Meta:
        model = SpaceTaskModel
        fields = ("id", "name", "description",
                  "author", "status",
                  "deadline","subtasks",
                  "tags", "responsibles",
                  "space",
                  )

    def validate_subtasks(self, attrs):
        for subtask in attrs:
            if self.instance is not None:
                if self.instance.id == subtask.id:
                    raise exceptions.ValidationError(f"Не возможно задачу {subtask.id} "
                                                     + f"сделать подзадачей {subtask.id}!")
        return super().validate(attrs)

    def validate_responsibles(self, attrs):
        staff = self.context["space_model"].staff.all()
        for user in attrs:
            if user not in staff:
                raise exceptions.ValidationError(f"Пользователь {user.id} не " 
                                                 + "состоит в пространстве.")
        return super().validate(attrs)

    def create(self, validated_data):
        author = self.context["request"].user
        space = self.context["space_model"]
        tags = validated_data.pop("tags") if validated_data.get("tags") is not None else []
        subtasks = validated_data.pop("subtasks") if validated_data.get("subtasks") is not None else []
        responsibles = validated_data.pop("responsibles") if validated_data.get("responsibles") is not None else []
        model = SpaceTaskModel.objects.create(space=space,
                                              author=author, **validated_data)
        model.responsibles.set(responsibles)
        model.tags.set(tags)
        model.subtasks.set(subtasks)
        return model

    def update(self, instance, validated_data):
        if self.context['request'].method == "PUT":
            for field in ["name", "description","status", "deadline",
                          "subtasks", "tags", "responsibles"]:
                validated_data.setdefault(field, None)
        
        for m2m_filed in ["subtasks", "tags", "responsibles"]:
            if validated_data.get(m2m_filed, 0) != 0:
                values_field = validated_data.pop(m2m_filed)
                if values_field is None:
                    values_field = []
                getattr(instance, m2m_filed).set(values_field)

        for name, value in validated_data.items():
            setattr(instance, name, value)

        instance.save()
        return instance


class HistorySerializer(serializers.Serializer):
    """Сериализатор истории изменений задач."""
    author = serializers.SerializerMethodField(read_only=True)
    datetime = serializers.SerializerMethodField(read_only=True)
    name_task = serializers.SerializerMethodField(read_only=True)
    id_task = serializers.SerializerMethodField(read_only=True)
    action = serializers.SerializerMethodField(read_only=True)
    change_reason = serializers.SerializerMethodField(read_only=True)

    def get_author(self, obj):
        serializer = UserSerializer(obj.history_user)
        return serializer.data

    def get_datetime(self, obj):
        return obj.history_date.isoformat()
    
    def get_name_task(self, obj):
        return obj.instance.name
    
    def get_id_task(self, obj):
        return obj.instance.id

    def get_action(self, obj):
        return obj.get_history_type_display()

    def get_change_reason(self, obj):
        return obj.history_change_reason
