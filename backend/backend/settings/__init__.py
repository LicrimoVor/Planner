from .base import *

work_mode = os.getenv("WORK_MODE")

if work_mode == "prod":
    from .prod import *

elif work_mode == "dev":
    from .dev import *
