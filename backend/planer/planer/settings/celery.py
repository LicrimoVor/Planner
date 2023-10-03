import os
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
