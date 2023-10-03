import os

from .base import INSTALLED_APPS, REST_FRAMEWORK


INSTALLED_APPS += [
    "oauth2_provider",
    "social_django",
    "rest_framework_social_oauth2",
]

SOCIAL_AUTH_VK_OAUTH2_KEY = os.getenv("SOCIAL_AUTH_VK_OAUTH2_KEY")
SOCIAL_AUTH_VK_OAUTH2_SECRET = os.getenv("SOCIAL_AUTH_VK_OAUTH2_SECRET")


REST_FRAMEWORK["DEFAULT_AUTHENTICATION_CLASSES"] += [
    "oauth2_provider.contrib.rest_framework.OAuth2Authentication",
    "rest_framework_social_oauth2.authentication.SocialAuthentication",
]

AUTHENTICATION_BACKENDS = [
    "social_core.backends.vk.VKOAuth2",
    "rest_framework_social_oauth2.backends.DjangoOAuth2",
    "django.contrib.auth.backends.ModelBackend",
]
