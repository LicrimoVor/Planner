# flake8: noqa
import os

from .base import *


DEBUG = os.getenv('DEBUG', "False") == "True"
if DEBUG:
    THIRD_PARTY_APPS = ["debug_toolbar", ]
    INSTALLED_APPS += THIRD_PARTY_APPS

    THIRD_PARTY_MIDDLEWARE = ["debug_toolbar.middleware.DebugToolbarMiddleware"]
    MIDDLEWARE += THIRD_PARTY_MIDDLEWARE
    INTERNAL_IPS = os.getenv('INTERNAL_IPS', "127.0.0.1").split(" ")


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

