from rest_framework.permissions import (
    SAFE_METHODS,
    BasePermission,
)
from django.contrib.auth import get_user_model


User = get_user_model()


class SpaceStaffPermission(BasePermission):
    """
    Разрешает доступ, если пользователь состоит в пространстве.
    """

    message = "Вы не состоите в данном пространстве."

    def has_permission(self, request, view):
        username = request.user.username
        staff = view.space.staff.all()
        if staff.filter(username=username):
            return True
        return False

    def has_object_permission(self, request, view, obj):
        username = request.user.username
        staff = view.space.staff.all()
        if staff.filter(username=username):
            return True
        return False


class StaffAdminPermission(BasePermission):
    """
    Разрешает особые действия в пространстве
    только администратору этом пространстве.
    """

    message = "Вы не являетесь администратором данным пространством."

    def has_object_permission(self, request, view, obj):
        user = request.user
        admin = obj.admin
        return (request.method in SAFE_METHODS
                or user==admin)


class ModifyAdminPermission(BasePermission):
    """
    Разрешает доступ на изменение если пользователь администратор сервиса.
    """

    message = "Вы не являетесь администратором сервиса."

    def has_permission(self, request, view):
        return (request.method in SAFE_METHODS
                or request.user.is_staff)


class AuthorPermission(BasePermission):
    """
    Проверка запросов get-retr, patch, put и del
    на авторство (в которых есть id).
    """

    message = "Это не ваша задача!"

    def has_object_permission(self, request, view, obj):
        user = request.user
        author = obj.author
        return user==author
