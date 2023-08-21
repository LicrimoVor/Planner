from .base import *

DEBUG = os.getenv('DEBUG', "False") == "True"
if DEBUG:
    THIRD_PARTY_APPS = ["debug_toolbar", ]
    INSTALLED_APPS += THIRD_PARTY_APPS

    THIRD_PARTY_MIDDLEWARE = ["debug_toolbar.middleware.DebugToolbarMiddleware"]
    MIDDLEWARE += THIRD_PARTY_MIDDLEWARE
    INTERNAL_IPS = os.getenv('INTERNAL_IPS', "127.0.0.1").split(" ")

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("POSTGRES_USER"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD"),
        "HOST": os.getenv("DB_HOST"),
        "PORT": os.getenv("DB_PORT"),
        "ATOMIC_REQUESTS": True, 
    } 
}
