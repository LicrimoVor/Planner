import os

from telegram_django_bot.tg_dj_bot import TG_DJ_Bot
from telegram_django_bot.routing import RouterCallbackMessageCommandHandler
from telegram.ext import ApplicationBuilder

from .base import INSTALLED_APPS


INSTALLED_APPS += [
    'telegram_django_bot',
    'django_json_widget',
]


TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
TELEGRAM_ROOT_UTRLCONF = 'backend.urls'


#  or in 20.x version :
bot = TG_DJ_Bot(TELEGRAM_TOKEN)
application = ApplicationBuilder().bot(bot).build()
application.add_handler(RouterCallbackMessageCommandHandler())


