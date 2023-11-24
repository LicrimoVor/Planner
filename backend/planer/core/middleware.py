import logging
import os

logger = logging.getLogger(__name__)


class CheckAuthorizationMiddleWare(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        """Костылек"""
        response = self.get_response(request)
        # logger.error(response.content)
        # response.headers._store['access-control-allow-origin'] = ('access-control-allow-origin', os.getenv("CSRF_TRUSTED_ORIGINS"))
        # response.headers._store['access-control-allow-credentials'] = ('access-control-allow-credentials', "true")
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        return None

    def process_exception(self, request, exception):
        return None

    def process_template_response(self, request, response):
        return response
