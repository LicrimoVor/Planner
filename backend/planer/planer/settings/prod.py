# flake8: noqa
import os

from .base import *


INSTALLED_APPS += ["django.contrib.postgres",]

DEBUG = os.getenv('DEBUG', "False") == "True"
if DEBUG:
    THIRD_PARTY_APPS = ["debug_toolbar", ]
    INSTALLED_APPS += THIRD_PARTY_APPS

    THIRD_PARTY_MIDDLEWARE = ["debug_toolbar.middleware.DebugToolbarMiddleware"]
    MIDDLEWARE += THIRD_PARTY_MIDDLEWARE
    INTERNAL_IPS = os.getenv('ALLOWED_HOSTS', "127.0.0.1").split(" ")

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("POSTGRES_USER"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD"),
        "HOST": os.getenv("BACK_DB_HOST"),
        "PORT": os.getenv("BACK_DB_PORT"),
        "ATOMIC_REQUESTS": True, 
    } 
}

SOCIAL_AUTH_JSONFIELD_ENABLED = True
CSRF_TRUSTED_ORIGINS = os.getenv('CSRF_TRUSTED_ORIGINS', "http://127.0.0.1").split(" ")
