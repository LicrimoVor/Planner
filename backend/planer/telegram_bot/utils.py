import requests
import datetime as dt

from asgiref.sync import sync_to_async
from aiogram.utils.keyboard import InlineKeyboardBuilder

from task.models import PersonalTaskModel
from .keyboards import NumbersCallbackFactory
from telegram_bot.management.commands.runtelegram import db_redis


@sync_to_async
def get_new_image(URL):
    try:
        response = requests.get(URL)
    except Exception as error:
        print(error)
    response = response.json()
    return response[0].get('url')


@sync_to_async
def get_task_queryset(user, numb_page: int, count: int):
    queryset = PersonalTaskModel.objects.filter(author=user, parent__isnull=True).order_by("-deadline")[numb_page*count:(numb_page+1)*count]
    return queryset


@sync_to_async
def get_task(user, task_id):
    model = PersonalTaskModel.objects.get(author=user, id=task_id)
    return model


def get_task_answ(task, numb_task) -> tuple[str, InlineKeyboardBuilder]:
    builder = InlineKeyboardBuilder()
    deadline = "Его нет)"
    if task.deadline is not None:
        deadline = task.deadline.strftime('%H:%M - %d.%m.%Y') + dt.timedelta(hours=task.author.time_zone)
    status = "Его нет)"
    if task.status is not None:
        status = task.status.name
    text = (
        f"Подзадача {numb_task+1}\n"
        +f"Название: {task.name}\n"
        +f"Статус: {status}\n"
        +f"Дедлайн: {deadline}"
    )
    builder.button(
        text="✔️ Выполнить",
        callback_data=NumbersCallbackFactory(action="done", number=task.id)
    )
    builder.button(
        text="📃 Подробнее",
        callback_data=NumbersCallbackFactory(action="more_data", number=task.id)
    )
    # builder.button(
    #     text="✏️ Изменить",
    #     callback_data=NumbersCallbackFactory(action="change", number=task.id)
    # )
    return text, builder


def get_page(tg_id) -> int:
    page = db_redis.get(tg_id)
    if page is None:
        page = 0
    else:
        page = int(page)
    return page
