from rest_framework import serializers

from organizations.models import OrgModel
from .user import UserSerializer

class OrgNotPermSerializer(serializers.ModelSerializer):
    """Сериализатор статусов."""
    admin = UserSerializer()

    class Meta:
        model = OrgModel
        fields = ("name", "admin")


class OrgPermSerializer(serializers.ModelSerializer):
    """Сериализатор статусов."""
    admin = UserSerializer()
    staff = UserSerializer(many=True)

    class Meta:
        model = OrgModel
        fields = ("name", "admin", "staff")
