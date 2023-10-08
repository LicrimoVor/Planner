import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "planer.settings")

app = Celery("planer")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'task_notification': {
        'task': 'telegram_bot.tasks.check_notification',
        'schedule': crontab(hour='*/1')
    },
}
