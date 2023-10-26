from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.base_user import AbstractBaseUser


UserModel = get_user_model()

class UserBackend(ModelBackend):

    def get_group_permissions(self, user_obj, obj=None):
        return set()

    def authenticate(self, request, username=None, password=None, **kwargs):
        print("@"*10)
        if username is None:
            print("8"*10)
            username = kwargs.get(UserModel.USERNAME_FIELD)
        if username is None or password is None:
            print("Z"*10)
            return
        try:
            print("*"*10)
            user = UserModel._default_manager.get_by_natural_key(username)
        except UserModel.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            UserModel().set_password(password)
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
