import os

from telegram_django_bot.apps import TelegramDjangoBotConfig

from .base import INSTALLED_APPS, BASE_DIR

TelegramDjangoBotConfig.verbose_name = "Телеграм-бот (опять не для Алеши)"

INSTALLED_APPS += [
    'telegram_django_bot',
    'django_json_widget',
]

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_ROOT_UTRLCONF = 'planer.utrls'
TELEGRAM_LOG = BASE_DIR.parent


