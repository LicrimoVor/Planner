from django.contrib import admin

from django_celery_beat.models import (IntervalSchedule, CrontabSchedule,
                                       SolarSchedule, ClockedSchedule)
from django_celery_results.models import GroupResult, TaskResult

from .models import TelegramUser

IntervalSchedule._meta.verbose_name = "Цикличность"
IntervalSchedule._meta.verbose_name_plural = "Цикличности"

admin.site.unregister(GroupResult)
admin.site.unregister(TaskResult)
admin.site.unregister(ClockedSchedule)
admin.site.unregister(CrontabSchedule)
admin.site.unregister(SolarSchedule)
admin.site.unregister(IntervalSchedule)

TelegramUser._meta.app_label = 'users'


@admin.register(TelegramUser)
class TelegramAdmin(admin.ModelAdmin):
    """Админ панель телеграм пользователей."""
    
    list_display = ("telegram_id", "first_name", "last_name", "user")
