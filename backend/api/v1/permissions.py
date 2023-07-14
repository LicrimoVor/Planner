from rest_framework.permissions import (
    SAFE_METHODS,
    BasePermission,
    IsAuthenticatedOrReadOnly,
)
from django.contrib.auth import get_user_model

User = get_user_model()


class OrgPermission(BasePermission):
    """
    Разрешает изменение и просмотр задач орг.
    только пользователям, которые состоят в 
    данной орг.
    """

    message = "Вы не состоите в организации."

    def has_permission(self, request, view):
        user = request.user
        return False


class OrgAdminPermission(BasePermission):
    """
    Разрешает особые действия в органзиации
    только администратору этой организации.
    """

    message = "Вы не являетесь администратором данной организации."

    def has_permission(self, request, view):
        user = request.user
        return (request.method in ("POST", "GET")
                or False)


class ModifyAdminPermission(BasePermission):
    """
    Разрешает доступ на изменение если пользователь администратор сервиса.
    """

    message = "Вы не являетесь администратором сервиса."

    def has_permission(self, request, view):
        return (request.method in SAFE_METHODS
                or request.user.is_staff)
