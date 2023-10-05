import os

from celery import Celery
from celery.schedules import crontab
from celery import shared_task

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "planer.settings")

app = Celery("planer")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()


@shared_task
def debug():
    return "lol"


app.conf.beat_schedule = {
    'Kek': {
        'task': 'planer.celery.debug',
        'schedule': crontab(minute='*/1')
    },
    'task_notification': {
        'task': 'telegram_bot.tasks.check_notification',
        'schedule': crontab(minute='*/1')
    },
}
