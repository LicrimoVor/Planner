import datetime
import requests

from celery import shared_task
from django.db.models import Q

from task.models import PersonalTaskModel
from planer.settings import TELEGRAM_TOKEN

URL_TELEGRAM = "https://api.telegram.org/bot"
METHOD_1 = "/sendMessage?chat_id="
METHOD_2 = "&text="


@shared_task
def check_notification():
    data = datetime.datetime.now()
    data_future = data + datetime.timedelta(hours=1)
    status_list = ["В процессе", "Не начато", "На проверке"]
    quaryset = PersonalTaskModel.objects.filter(
          Q(deadline__gte=data) 
        & Q(deadline__lte=data_future)
        & Q(author__tg_user__isnull=False)
        & Q(status__name__in=status_list)
    )
    for _, task in enumerate(quaryset):
        text = (
            "Близится погибель легиона\n"
            +f"Название: {task.name}\n"
            +f"Статус: {task.status.name}\n"
            +f"Дедлайн: {task.deadline}\n"
            +f"Описание: {task.description}"
        )
        for tg_user in task.author.tg_user.all():
            chat_id = tg_user.telegram_id
            send_notification.delay(chat_id, text)

    return "ПроверОчка выполнена"

@shared_task
def send_notification(chat_id, message):
    response = requests.get(URL_TELEGRAM+TELEGRAM_TOKEN+METHOD_1+str(chat_id)+METHOD_2+message)
    return f"Мы ему написали: {chat_id}. Status: {response.status_code}"
