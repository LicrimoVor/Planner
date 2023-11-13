import sys

from django.contrib.auth import get_user_model
from djoser.email import ActivationEmail, PasswordResetEmail, UsernameResetEmail
from celery import shared_task

User = get_user_model()


@shared_task
def send_activation(class_name: str, email: str, *args, **kwargs) -> str:
    """Отправляет письмо."""
    EmailCl = getattr(sys.modules[__name__], class_name)
    user = User.objects.get(email=email)
    EmailCl(context={"user":user}).send([email,])
    return f"Письмо с активацией отправлено {email}"


class CeleryActivationEmail(ActivationEmail):
    """
    Отправляет письмо с активацией аккаунта пользователя.
    Изменен принцип отправки: вместо непосредственного 
    отправления письма, добавляется задача для celery.
    """

    def send(self, to, *args, **kwargs) -> None:
        send_activation.delay(self.__class__.__bases__[0].__name__, *to)


class CeleryPasswordResetEmail(PasswordResetEmail):
    """
    Отправляет письмо с изменением пароля пользователя.
    Изменен принцип отправки: вместо непосредственного 
    отправления письма, добавляется задача для celery.
    """

    def send(self, to, *args, **kwargs) -> None:
        send_activation.delay(self.__class__.__bases__[0].__name__, *to)


class CeleryUsernameResetEmail(UsernameResetEmail):
    """
    Отправляет письмо с изменением логина пользователя.
    Изменен принцип отправки: вместо непосредственного 
    отправления письма, добавляется задача для celery.
    """

    def send(self, to, *args, **kwargs) -> None:
        send_activation.delay(self.__class__.__bases__[0].__name__, *to)
