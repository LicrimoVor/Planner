import os
import requests
from asgiref.sync import sync_to_async

from aiogram import types
from aiogram.filters import Command

from telegram_bot.management.commands.runtelegram import dp
from .filters import IsUserFilter
from .keyboards import lol


URL_DOG = os.getenv("URL_DOG")
URL_CAT = os.getenv("URL_CAT")

@sync_to_async
def get_new_image(URL):
    try:
        response = requests.get(URL)
    except Exception as error:
        print(error)
    response = response.json()
    return response[0].get('url')


@dp.message(Command("start"))
async def start(message: types.Message):
    await message.reply("Hello!")


@dp.message(Command("nt_kt"))
async def next_kitty(message: types.Message):
    await message.bot.send_photo(
        message.chat.id,
        await get_new_image(URL_CAT),
        reply_markup=lol,
    )


@dp.message(Command("nt_dg"))
async def next_doggy(message: types.Message):
    await message.bot.send_photo(
        message.chat.id,
        await get_new_image(URL_DOG),
        reply_markup=lol,
    )
