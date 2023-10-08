from typing import Optional

from aiogram.filters.callback_data import CallbackData
from aiogram.utils.keyboard import InlineKeyboardBuilder

PAGE_NUMB = 5


class ActionCallbackFactory(CallbackData, prefix="fabnum"):
    """Параметр action исп-ся для роутинга"""
    action: str


class NumbersCallbackFactory(ActionCallbackFactory, prefix="fabnum"):
    """Параметр number может иметь разное предназначение"""
    number: Optional[int] = None


task_pagination = InlineKeyboardBuilder()
task_pagination.button(
    text="⬅️ Назад", callback_data=NumbersCallbackFactory(action="task_list", number=-1))
task_pagination.button(
    text="Далее ➡️", callback_data=NumbersCallbackFactory(action="task_list", number=1))
task_pagination.button(
    text="🏠 Меню", callback_data=ActionCallbackFactory(action="main_menu"))
task_pagination.adjust(2)


main_menu = InlineKeyboardBuilder()
main_menu.button(text="🙍‍♂️ Пользователь", callback_data=ActionCallbackFactory(action="user"))
main_menu.button(text="📒 Список задач", callback_data=NumbersCallbackFactory(action="task_list", number=0))
# main_menu.button(text="➕ Создать задачу", callback_data=ActionCallbackFactory(action="create_task"))
main_menu.adjust(1)


dog_cat = InlineKeyboardBuilder()
dog_cat.button(text="🐶 Собачка", callback_data=ActionCallbackFactory(action="dog"))
dog_cat.button(text="🐱 Котик", callback_data=ActionCallbackFactory(action="cat"))

