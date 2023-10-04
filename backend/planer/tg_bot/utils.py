import sys
from functools import wraps

import telegram
from django.utils import timezone

from django.conf import settings
from django.utils import translation
from telegram_django_bot.models import ActionLog, TeleDeepLink


from .models import TelegramUser


ERROR_MESSAGE = "Беку плохо. Давайте пособолезнуем ему)"
LOGGING_TELEGRAM_ACTIONS = getattr(settings, 'TELEGRAM_ACTION_LOG', True)

def add_log_action(user_id, action):
    if LOGGING_TELEGRAM_ACTIONS:
        ActionLog.objects.create(type=action, user_id=user_id)


def handler_decor(log_type='F', update_user_info=True):
    """

    :param log_type: 'F' -- функция, 'C' -- callback or command, 'U' -- user-status, 'N' -- NO LOG
    :param update_user_info: update user info if it has been changed
    :return:
    """

    def decor(func):
        @wraps(func)
        def wrapper(update, CallbackContext):
            def check_first_income():
                if update and update.message and update.message.text:
                    query_words = update.message.text.split()
                    if len(query_words) > 1 and query_words[0] == '/start':
                        telelink, _ = TeleDeepLink.objects.get_or_create(link=query_words[1])
                        telelink.users.add(user)

            bot = CallbackContext.bot

            user_details = update.effective_user
            # if update.callback_query:
            #     user_details = update.callback_query.from_user
            # elif update.inline_query:
            #     user_details = update.inline_query.from_user
            # else:
            #     user_details = update.message.from_user

            if user_details is None:
                raise ValueError(
                    f'handler_decor is made for communication with user, current update has not any user: {update}'
                )

            user_adding_info = {
                'id': user_details.id,
                'telegram_language_code': user_details.language_code or 'en',
                'telegram_username': user_details.username[:64] if user_details.username else '',
                'first_name': user_details.first_name[:30] if user_details.first_name else '',
                'last_name': user_details.last_name[:60] if user_details.last_name else '',
            }

            user, created = TelegramUser.objects.get_or_create(
                id=user_details.id,
                defaults=user_adding_info
            )

            if created:
                add_log_action(user.id, 'ACTION_CREATED')
                check_first_income()
            elif update_user_info:
                # check if telegram_username or first_name or last_name changed:
                fields_changed = False
                for key in ['telegram_username', 'first_name', 'last_name']:
                    if getattr(user, key) != user_adding_info[key]:
                        setattr(user, key, user_adding_info[key])
                        fields_changed = True

                if fields_changed:
                    user.save()

            if settings.USE_I18N:
                translation.activate(user.language_code)

            raise_error = None
            try:
                res = func(bot, update, user)
            except telegram.error.BadRequest as error:
                if 'Message is not modified:' in error.message:
                    res = None
                else:
                    res = bot.send_message(user.id, str(ERROR_MESSAGE))  # should be bot.send_format_message
                    tb = sys.exc_info()[2]
                    raise_error = error.with_traceback(tb)
            except Exception as error:

                res = bot.send_message(user.id, str(ERROR_MESSAGE))  # should be bot.send_format_message
                tb = sys.exc_info()[2]
                raise_error = error.with_traceback(tb)

            # log actions

            if log_type != 'N':
                if log_type == 'C':
                    if update.callback_query:
                        log_value = update.callback_query.data
                    else:
                        log_value = update.message.text
                elif log_type == 'U':
                    log_value = user.current_utrl
                # elif log_type == 'F':
                else:
                    log_value = func.__name__

                add_log_action(user.id, log_value[:32])

            if ActionLog.objects.filter(user=user, type='ACTION_ACTIVE_TODAY', dttm__date=timezone.now().date()).count() == 0:
                add_log_action(user.id, 'ACTION_ACTIVE_TODAY')

            if raise_error:
                raise raise_error

            return res
        return wrapper
    return decor
