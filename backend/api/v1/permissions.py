from rest_framework.permissions import (
    SAFE_METHODS,
    BasePermission,
)
from django.contrib.auth import get_user_model


User = get_user_model()


class OrgTaskPermission(BasePermission):
    """
    Разрешает изменение и просмотр задач организации.
    """

    message = "Вы не состоите в организации."

    def has_permission(self, request, view):
        username = request.user.username
        staff = view.organizataion.staff.all()
        if staff.filter(username=username):
            return True
        return False

    def has_object_permission(self, request, view, obj):
        username = request.user.username
        staff = view.organizataion.staff.all()
        if staff.filter(username=username):
            return True
        return False

class OrgInfPermission(BasePermission):
    """
    Разрешает просмотр доп. инф про организацию
    """

    def has_object_permission(request, view, obj):
        username = request.user.username
        staff = obj.staff.all()
        if staff.filter(username=username):
            return True
        return False


class OrgAdminPermission(BasePermission):
    """
    Разрешает особые действия в органзиации
    только администратору этой организации.
    """

    message = "Вы не являетесь администратором данной организации."

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
