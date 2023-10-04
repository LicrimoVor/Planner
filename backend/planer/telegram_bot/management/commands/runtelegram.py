import os
import asyncio
import logging

from django.core.management.base import BaseCommand
from aiogram import Bot, Dispatcher

from planer.settings import TELEGRAM_TOKEN


bot = Bot(TELEGRAM_TOKEN)
dp = Dispatcher()
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

class Command(BaseCommand):
    help = 'Start telegram bot.'
    def handle(self, *args, **options):
        asyncio.run(dp.start_polling(bot))
