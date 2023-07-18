from rest_framework import serializers

from organizations.models import OrgModel


class OrgNotPermSerializer(serializers.ModelSerializer):
    """Сериализатор статусов."""

    class Meta:
        model = OrgModel
        fields = ("name", "admin")


class OrgPermSerializer(serializers.ModelSerializer):
    """Сериализатор статусов."""

    class Meta:
        model = OrgModel
        fields = ("name", "admin", "staff")
