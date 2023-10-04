from django.contrib.auth import get_user_model
from telegram_django_bot.telegram_lib_redefinition import InlineKeyboardButtonDJ
from telegram_django_bot.routing import telegram_reverse
from telegram_django_bot.tg_dj_bot import TG_DJ_Bot
from telegram import Update


from task.models import PersonalTaskModel
from .forms import PersTaskForm
from .utils import handler_decor


User = get_user_model()


@handler_decor()
def start(bot: TG_DJ_Bot, update: Update, user: User):
    message = f"LOL: {user.first_name} or {user.telegram_username} or {user.id}"
    buttons = [
        # [InlineKeyboardButtonDJ(
        #     text='🧩 Персональные задачи',
        #     callback_data="",
        # )],
        # [InlineKeyboardButtonDJ(text='⚙️ Настроечки', callback_data='us/se')],
    ]

    return bot.edit_or_send(update, message, buttons)



@handler_decor()
def some_debug_func(bot: TG_DJ_Bot, update: Update, user: User):
    message = "Какой то мега дебаг"

    buttons = [[
        InlineKeyboardButtonDJ(
            text='🔙 Главное меню',
            callback_data="main_menu",
        ),
    ]]

    return bot.edit_or_send(update, message, buttons)
