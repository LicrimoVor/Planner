import logging
import json

from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone
from django.conf import settings
from django.db.models import QuerySet
from django.core.serializers.json import DjangoJSONEncoder
from telegram_django_bot.models import _seed_code, TelegramDjangoJsonDecoder

User = get_user_model()


class TelegramUser(models.Model):
    id = models.BigIntegerField(primary_key=True)
    seed_code = models.IntegerField(default=_seed_code)
    telegram_username = models.CharField(max_length=64, null=True, blank=True)
    telegram_language_code = models.CharField(max_length=16, default='en')
    timezone = models.DurationField(default=timezone.timedelta(hours=3))
    current_utrl = models.CharField(max_length=64, default='', blank=True)
    current_utrl_code_dttm = models.DateTimeField(null=True, blank=True)
    current_utrl_context_db = models.CharField(max_length=4096, default='{}', blank=True)
    current_utrl_form_db = models.CharField(max_length=4096, default='{}', blank=True)
    first_name = models.CharField(max_length=150, default="NoName")
    last_name = models.CharField(max_length=150, default="NoName")
    user_site = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="user_site",
    )

    def __str__(self):
        return f"U({self.id}, {self.telegram_username or '-'}, {self.first_name or '-'})"

    class Meta:
        # proxy = True
        app_label = 'telegram_django_bot'
        db_table = "TelegramUser"
        verbose_name = "Телеграм пользователь"
        verbose_name_plural = "Телеграм пользователи"

    @property
    def current_utrl_form(self):
        if not hasattr(self, '_current_utrl_form'):
            self._current_utrl_form = json.loads(self.current_utrl_form_db, cls=TelegramDjangoJsonDecoder)
        return self._current_utrl_form

    @property
    def current_utrl_context(self):
        if not hasattr(self, '_current_utrl_context'):
            self._current_utrl_context = json.loads(self.current_utrl_context_db, cls=TelegramDjangoJsonDecoder)
        return self._current_utrl_context

    def save_form_in_db(self, form_name, form_data, do_save=True):
        db_form_data = {}

        for key, value in form_data.items():
            if issubclass(value.__class__, models.Model):
                db_value = value.pk
            elif (type(value) in [list, QuerySet]) and all(map(lambda x: issubclass(x.__class__, models.Model), value)):
                db_value = list([str(x.pk) for x in value])
            else:
                db_value = value

            db_form_data[key] = db_value

        self.current_utrl_form_db = json.dumps({
            'form_name': form_name,
            'form_data': db_form_data,
        }, cls=DjangoJSONEncoder)
        if do_save:
            self.save()

        if hasattr(self, '_current_utrl_form'):
            delattr(self, '_current_utrl_form')

    def save_context_in_db(self, context, do_save=True):
        self.current_utrl_context_db = json.dumps(context, cls=DjangoJSONEncoder)
        if do_save:
            self.save()

        if hasattr(self, '_current_utrl_context'):
            delattr(self, '_current_utrl_context')

    def clear_status(self, commit=True):
        self.current_utrl = ''
        self.current_utrl_code_dttm = None
        self.current_utrl_context_db = '{}'
        self.current_utrl_form_db = '{}'
        if commit:
            self.save()

        for attr in ['_current_utrl_context', '_current_utrl_form']:
            if hasattr(self, attr):
                delattr(self, attr)


    @property
    def language_code(self):
        if self.telegram_language_code in map(lambda x: x[0], settings.LANGUAGES):
            return self.telegram_language_code
        return settings.LANGUAGE_CODE

    def save(self, *args, **kwargs):
        if self.id is None and self.is_staff:
            id_num = 1
            while self.__class__.objects.filter(id=id_num).count():
                id_num += 1

            self.id = id_num

            logging.warning(f"Try to save user without ID. For staff the smallest unused ID will be used: {id_num}")

        return super(TelegramUser, self).save(*args, **kwargs)
