from aiogram.types import KeyboardButton, ReplyKeyboardMarkup, InlineKeyboardButton, InlineKeyboardMarkup

dog_button = KeyboardButton(text="/nt_dg", callback_data="nt_dg")
cat_button = KeyboardButton(text="/nt_kt", callback_data="nt_kt")
lol = ReplyKeyboardMarkup(keyboard=[
    [dog_button, cat_button],
], )
