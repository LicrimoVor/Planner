import os

from .base import INSTALLED_APPS

INSTALLED_APPS += [
    'telegram_django_bot',
    'django_json_widget',
]

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_ROOT_UTRLCONF = 'planer.utrls'
