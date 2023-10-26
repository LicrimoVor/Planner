from django_celery_beat.apps import BeatConfig

from .base import INSTALLED_APPS


BeatConfig.verbose_name = "Celery-задачи (не для Алеши)"

INSTALLED_APPS += [
    "django_celery_results",
    "django_celery_beat",
]

REDIS_HOST = "redis"
REDIS_PORT = '6379'

CELERY_BROKER_URL = f"redis://{REDIS_HOST}:{REDIS_PORT}/0"
CELERY_RESULT_BACKEND = f"redis://{REDIS_HOST}:{REDIS_PORT}/0"
CELERY_CACHE_BACKEND = 'default'
CELERY_BROKER_TRANSPORT_OPTIONS = {'visibility_timeout': 3600} 
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"


CACHES = {
    'default':{
        "BACKEND": 'django.core.cache.backends.redis.RedisCache',
        "LOCATION": f"redis://{REDIS_HOST}:{REDIS_PORT}/1",
    }
}
