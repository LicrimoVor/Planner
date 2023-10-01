import os

REDIS_HOST = '0.0.0.0'
REDIS_PORT = '6379'

CACHES = {
    'default':{
        "BACKEND": 'django.core.cache.backends.redis.RedisCache',
        "LOCATION": os.getenv("CELERY_BROKER_URL") + "/1",
    }
}
