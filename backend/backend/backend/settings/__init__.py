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
from .celery import app as celery_app
from .tg_bot import *
from .logger import *
from .redis import *


__all__ = ("celery_app",)