import os

from .base import DJOSER


DJOSER |= {
    'PASSWORD_RESET_CONFIRM_URL': 'recovery/password/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL': 'recovery/username/{uid}/{token}',
    'ACTIVATION_URL': 'user/activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND': True,
    'USERNAME_RESET_SHOW_EMAIL_NOT_FOUND': True,
    'EMAIL': {
        'activation': 'core.utils.CeleryActivationEmail',
        'password_reset': 'core.utils.CeleryPasswordResetEmail',
        'username_reset': 'core.utils.CeleryUsernameResetEmail',
    }
}

EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS")
EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_PORT = os.getenv("EMAIL_PORT")
