from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.http import Http404

User = get_user_model()


class UserBackend(ModelBackend):
    """Backend, производящий вход по email и username."""

    def authenticate(self, request, email=None, username=None, password=None, **kwargs):
        if (username is None or email is None) and password is None:
            return
        
        if username is not None:
            try:
                user = User._default_manager.get_by_natural_key(username)
            except User.DoesNotExist:
                User().set_password(password)
        else:
            try:
                user = get_object_or_404(User, email=email)
            except Http404:
                User().set_password(password)
        
        if user.check_password(password):
            return user

    def get_group_permissions(self, *args, **kwargs) -> set[str]:
        return set()
