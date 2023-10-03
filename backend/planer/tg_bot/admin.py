from django.contrib import admin
from telegram_django_bot.models import (Trigger, UserTrigger, ActionLog,
                                        TeleDeepLink, BotMenuElem, BotMenuElemAttrText)
from django_celery_beat.models import (IntervalSchedule, CrontabSchedule,
                                       SolarSchedule, ClockedSchedule)
from django_celery_results.models import GroupResult, TaskResult


Trigger._meta.verbose_name = "Триггер"
Trigger._meta.verbose_name_plural = "Триггеры"

ActionLog._meta.verbose_name = "Логи бота"
ActionLog._meta.verbose_name_plural = "Логи бота"

UserTrigger._meta.verbose_name = "Пользовательский триггер"
UserTrigger._meta.verbose_name_plural = "Пользовательские триггеры"

IntervalSchedule._meta.verbose_name = "Цикличность"
IntervalSchedule._meta.verbose_name_plural = "Цикличности"

# admin.site.unregister(UserTrigger)
admin.site.unregister(TeleDeepLink)
admin.site.unregister(BotMenuElemAttrText)
admin.site.unregister(BotMenuElem)

admin.site.unregister(GroupResult)
admin.site.unregister(TaskResult)
admin.site.unregister(ClockedSchedule)
admin.site.unregister(CrontabSchedule)
admin.site.unregister(SolarSchedule)
