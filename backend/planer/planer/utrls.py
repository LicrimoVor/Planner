from django.urls import re_path, include

urlpatterns = [
    re_path('telegram/', include(('tg_bot.utrls', 'tg_bot'), namespace='tg_bot')),
]