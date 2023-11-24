from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.http import Http404

UserModel = get_user_model()


class UserBackend(ModelBackend):
    """Backend, производящий вход по email и username."""

    def authenticate(self, request, email=None, username=None, password=None, **kwargs):
        if (username is None or email is None) and password is None:
            return

        user = None
        if username is not None:
            try:
                user = UserModel._default_manager.get_by_natural_key(username)
            except UserModel.DoesNotExist:
                UserModel().set_password(password)
        else:
            try:
                user = get_object_or_404(UserModel, email=email)
            except Http404:
                UserModel().set_password(password)
        
        if user is not None and user.check_password(password):
            return user

    def get_group_permissions(self, *args, **kwargs) -> set[str]:
        return set()
