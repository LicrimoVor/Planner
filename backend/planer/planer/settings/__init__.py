# flake8: noqa
import os

from .base import *

work_mode = os.getenv("WORK_MODE")

if work_mode == "prod":
    from .prod import *

elif work_mode == "dev":
    from .dev import *

# from .social import *
# from .email import *
from .tg_bot import *
from .logger import *
from .celery import *


INSTALLED_APPS += [
    'users.apps.UsersConfig',
    'core.apps.CoreConfig',
    'task.apps.TaskConfig',
    'space.apps.SpaceConfig',
    'api.apps.ApiConfig',
    "tg_bot.apps.TgBotConfig",
]
