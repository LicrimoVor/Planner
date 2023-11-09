from djoser.email import ActivationEmail, PasswordResetEmail, UsernameResetEmail
from templated_mail.mail import BaseEmailMessage
from celery import shared_task


@shared_task
def send_activation(email: BaseEmailMessage, to: str) -> str:
    """Отправляет письмо"""
    email.send([to,])
    return f"Письмо с активацией отправлено {to}"


class CeleryActivationEmail(ActivationEmail):
    """
    Отправляет письмо с активацией аккаунта пользователя.
    Изменен принцип отправки: вместо непосредственного 
    отправления письма, добавляется задача для celery
    """

    def send(self, to, *args, **kwargs) -> None:
        send_activation.delay(self, to)


class CeleryPasswordResetEmail(PasswordResetEmail):
    """
    Отправляет письмо с изменением пароля пользователя.
    Изменен принцип отправки: вместо непосредственного 
    отправления письма, добавляется задача для celery
    """

    def send(self, to, *args, **kwargs) -> None:
        send_activation.delay(self, to)


class CeleryUsernameResetEmail(UsernameResetEmail):
    """
    Отправляет письмо с изменением логина пользователя.
    Изменен принцип отправки: вместо непосредственного 
    отправления письма, добавляется задача для celery
    """

    def send(self, to, *args, **kwargs) -> None:
        send_activation.delay(self, to)
