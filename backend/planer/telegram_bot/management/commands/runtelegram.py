import os
import asyncio
import logging

import redis
from django.core.management.base import BaseCommand
from aiogram import Bot, Dispatcher

from planer.settings import TELEGRAM_TOKEN, REDIS_HOST, REDIS_PORT


bot = Bot(TELEGRAM_TOKEN)
db_redis = redis.StrictRedis(REDIS_HOST, port=REDIS_PORT, db=2, decode_responses=True)
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
