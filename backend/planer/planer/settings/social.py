import os

from .base import INSTALLED_APPS, TEMPLATES, MIDDLEWARE


INSTALLED_APPS += [
    "social_django",
]

SOCIAL_AUTH_VK_OAUTH2_KEY = os.getenv("SOCIAL_AUTH_VK_OAUTH2_KEY")
SOCIAL_AUTH_VK_OAUTH2_SECRET = os.getenv("SOCIAL_AUTH_VK_OAUTH2_SECRET")
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = os.getenv("SOCIAL_AUTH_GOOGLE_OAUTH2_KEY")
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = os.getenv("SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET")
SOCIAL_AUTH_MAILRU_OAUTH2_KEY = os.getenv("SOCIAL_AUTH_MAILRU_OAUTH2_KEY")
SOCIAL_AUTH_MAILRU_OAUTH2_SECRET = os.getenv("SOCIAL_AUTH_MAILRU_OAUTH2_SECRET")
SOCIAL_AUTH_YANDEX_OAUTH2_KEY = os.getenv("SOCIAL_AUTH_YANDEX_OAUTH2_KEY")
SOCIAL_AUTH_YANDEX_OAUTH2_SECRET = os.getenv("SOCIAL_AUTH_YANDEX_OAUTH2_SECRET")

SOCIAL_AUTH_VK_OAUTH2_SCOPE = ['email']
SOCIAL_AUTH_VK_OAUTH2_API_VERSION = '5.81'
SOCIAL_AUTH_LOGIN_REDIRECT_URL = "/"
SOCIAL_AUTH_CREATE_USERS = True


SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    'social_core.pipeline.social_auth.associate_by_email',
    'social_core.pipeline.user.create_user',
    'users.social.save_profile',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
)

AUTHENTICATION_BACKENDS = [
    "users.backend.UserBackend",
    "social_core.backends.vk.VKOAuth2",
    "social_core.backends.google.GoogleOAuth2",
    "social_core.backends.mailru.MailruOAuth2",
    "social_core.backends.yandex.YandexOAuth2",
]

TEMPLATES[0]["OPTIONS"]["context_processors"] += [
    'social_django.context_processors.backends',
    'social_django.context_processors.login_redirect',
]

# MIDDLEWARE += (
#     'social.apps.django_app.middleware.SocialAuthExceptionMiddleware',
# )