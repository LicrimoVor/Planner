from django.urls import re_path
from django.conf import settings

from .views import start, some_debug_func


urlpatterns = [
    re_path('start/', start, name='start'),
    re_path('main_menu/', start, name='start'),
    re_path('pers_task/<int:page>/', start, name='pers_task'),
    re_path('space_task/<int:page>/', start, name='space_task'),
    re_path('secret_cats/', start, name='cats'),
    re_path('secret_dogs/', start, name='dogs'),
    re_path('register/', start, name="register")
]


if settings.DEBUG:
    urlpatterns += [
        re_path('some_debug_func', some_debug_func, name='some_debug_func'),
    ]