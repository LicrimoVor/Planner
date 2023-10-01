from celery import shared_task

from task.models import PersonalTaskModel
# from telegram_django_bot.tasks


@shared_task
def check_notigication():
    # quaryset = PersonalTaskModel.objects
    return "hello world!"
