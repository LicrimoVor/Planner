from telegram_django_bot import forms as td_forms

from task.models import PersonalTaskModel


class PersTaskForm(td_forms.TelegramModelForm):
    form_name = "Мои задачи"

    class Meta:
        model = PersonalTaskModel
        fields = ["name", "author"]

