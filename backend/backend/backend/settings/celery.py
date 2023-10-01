import os

from celery import Celery

from .base import INSTALLED_APPS

INSTALLED_APPS += [
    "django_celery_results",
    "django_celery_beat",
]

CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL") + "/0"
CELERY_RESULT_BACKEND = os.getenv("CELERY_BROKER_URL") + "/0"
CELERY_CACHE_BACKEND = 'default'
CELERY_BROKER_TRANSPORT_OPTIONS = {'visibility_timeout': 3600} 
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
app = Celery("planer_worker")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
