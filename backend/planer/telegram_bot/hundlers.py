import os
import datetime as dt

from aiogram import F
from aiogram import types
from aiogram.filters import Command
from aiogram.utils.markdown import hlink
from rest_framework.authentication import TokenAuthentication
from aiogram.utils.keyboard import InlineKeyboardBuilder

from telegram_bot.management.commands.runtelegram import dp, db_redis
from .filters import IsUserFilter, get_or_create_tg_user
from .keyboards import (
    dog_cat, task_pagination, main_menu,
    NumbersCallbackFactory, ActionCallbackFactory,
)
from .utils import get_new_image, get_task_queryset, get_task_answ, get_page
from task.models import PersonalTaskModel, StatusModel


URL_SITE = os.getenv("CSRF_TRUSTED_ORIGINS").split(" ")[-1]
URL_DOG = os.getenv("URL_DOG")
URL_CAT = os.getenv("URL_CAT")
COUNT_TASK = 5
STATUS_COMPLETE = 4


@dp.message(Command("start"))
async def start(message: types.Message):
    user_tg = await get_or_create_tg_user(message.from_user)
    if len(message.md_text.split(" ")) > 1:
        token = message.md_text.split(" ")[1]
        auth = TokenAuthentication()
        user_site, _ = auth.authenticate_credentials(token)
        user_tg.user = user_site
        user_tg.save()
        await message.bot.send_message(
            message.chat.id,
            "Вы успешно зарегистрированы!\n"
            +f"Никнейм: {user_site.username};\n"
            +f"Имя: {user_site.first_name};\n"
            +f"Фамилия: {user_site.last_name}.\n",
            reply_markup=main_menu.as_markup(),
        )
    else:
        if user_tg.user:
            await message.bot.send_message(
                message.chat.id,
                f"Хеллоу {user_tg.user.first_name}!",
                reply_markup=main_menu.as_markup(),
            )
        else:
            url = URL_SITE + "/settings/"
            await message.bot.send_message(
                message.chat.id,
                "А вы у нас не зарегистрированы. \n"
                +f"Прошу перейти в {hlink('настройки пользователя', url)}"
                +" и привязать аккаунт к телеграму"
                +" Можете пока посмотреть котиков и собачек)",
                parse_mode='HTML',
                reply_markup=dog_cat.as_markup(),
            )

@dp.message(Command("1q2w3e4r5t"))
async def secret(message: types.Message):
    await message.bot.send_message(
                message.chat.id,
                f"Welcome {message.from_user.full_name}",
                reply_markup=dog_cat.as_markup(),
            )


@dp.callback_query(ActionCallbackFactory.filter(F.action=="cat"))
async def next_kitty(callback: types.CallbackQuery):
    await callback.bot.send_photo(
        callback.from_user.id,
        await get_new_image(URL_CAT),
        reply_markup=dog_cat.as_markup(),
    )


@dp.callback_query(ActionCallbackFactory.filter(F.action=="dog"))
async def next_doggy(callback: types.CallbackQuery):
    await callback.bot.send_photo(
        callback.from_user.id,
        await get_new_image(URL_DOG),
        reply_markup=dog_cat.as_markup(),
    )


@dp.callback_query(NumbersCallbackFactory.filter(F.action=="task_list"), IsUserFilter())
async def task_list(callback: types.CallbackQuery,
                    callback_data: NumbersCallbackFactory,
                    user_model):
    page = get_page(callback.from_user.id)
    page = page+callback_data.number
    page = page if page > 0 else 0

    db_redis.set(callback.from_user.id, page)
    qyeryset = await get_task_queryset(user_model, page, COUNT_TASK)

    for numb_task, task in enumerate(qyeryset):
        text, builder = get_task_answ(task, numb_task)
        await callback.bot.send_message(
            callback.from_user.id, text, reply_markup=builder.as_markup(),
        )

    await callback.bot.send_message(
        callback.from_user.id,
        f"Страница {page+1}",
        reply_markup=task_pagination.as_markup(),
    )


@dp.callback_query(ActionCallbackFactory.filter(F.action=="main_menu"), IsUserFilter())
async def smain_menu(callback: types.CallbackQuery, *args, **kwargs):
    db_redis.set(callback.from_user.id, 0)
    await callback.bot.send_message(
        callback.from_user.id,
        "Главное меню",
        reply_markup=main_menu.as_markup(),
    )


@dp.callback_query(ActionCallbackFactory.filter(F.action=="user"), IsUserFilter())
async def user_params(callback: types.CallbackQuery, user_model, **kwargs):
    count_task = await PersonalTaskModel.objects.filter(author=user_model).acount()
    count_space = await user_model.user_space.acount()
    # builder = InlineKeyboardBuilder()
    # builder.button()

    await callback.bot.send_message(
        callback.from_user.id,
        f"Логин: {user_model.username}\n"
        +f"Имя: {user_model.first_name}\n"
        +f"Фамилия: {user_model.last_name}\n"
        +f"Почта: {user_model.email}\n"
        +f"Всего задач: {count_task}\n"
        +f"Всего пространств: {count_space}",
        reply_markup=main_menu.as_markup(),
    )

@dp.callback_query(NumbersCallbackFactory.filter(F.action=="done"), IsUserFilter())
async def done_task(callback: types.CallbackQuery, user_model, callback_data: NumbersCallbackFactory):
    task_id = callback_data.number
    task_model = PersonalTaskModel.objects.get(id=task_id, author=user_model)
    task_model.status = StatusModel.objects.get(id=STATUS_COMPLETE)
    task_model.save()

    await callback.bot.send_message(
        callback.from_user.id,
        "Задача успешно выполнена!",
        reply_markup=main_menu.as_markup(),
    )


@dp.callback_query(NumbersCallbackFactory.filter(F.action=="more_data"), IsUserFilter())
async def more_data(callback: types.CallbackQuery, user_model, callback_data: NumbersCallbackFactory):
    task_id = callback_data.number
    task_model = PersonalTaskModel.objects.get(id=task_id, author=user_model)
    if task_model.deadline is not None:
        deadline = task_model.deadline.strftime('%H:%M - %d.%m.%Y') + dt.timedelta(hours=task_model.author.time_zone)
    status = "Его нет)"
    if task_model.status is not None:
        status = task_model.status.name
    tags = ""
    for tag in task_model.tags.all():
        tags += f" {tag.name},"
    if tags != "":
        tags[-1] = ""
        tags += "\n"
    text = (
        f"Основная задача\n"
        +f"Название: {task_model.name}\n"
        +f"Статус: {status}\n"
        +f"Теги: {tags}\n"
        +f"Дедлайн: {deadline}\n"
        +f"Описание {task_model.description}\n"
        +f"Подзадачи ({task_model.subtasks.all().count()})"
    )
    await callback.bot.send_message(
        callback.from_user.id,
        text,
    )
    numb_task = 0
    for subtask in task_model.subtasks.all():
        text, builder = get_task_answ(subtask, numb_task)
        numb_task += 1
        await callback.bot.send_message(
            callback.from_user.id, text, reply_markup=builder.as_markup(),
        )
    
    builder = InlineKeyboardBuilder()
    page = get_page(callback.from_user.id)
    builder.button("🏃‍♂️Вернуться", callback_data=NumbersCallbackFactory(action="task_list", number=page))
    builder.button("🏠 Меню", callback_data=ActionCallbackFactory(action="main_menu"))

    await callback.bot.send_message(
            callback.from_user.id, "",
            reply_markup=builder.as_markup(),
    )
