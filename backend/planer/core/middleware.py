class CheckAuthorizationMiddleWare(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        """
        Code to be executed for each request before the view (and later
        middleware) are called.
        """
        response = self.get_response(request)
        response.headers._store['access-control-allow-origin'] = ('access-control-allow-origin', "http://localhost:3000")
        response.headers._store['access-control-allow-credentials'] = ('access-control-allow-credentials', "true")
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        return None

    def process_exception(self, request, exception):
        return None

    def process_template_response(self, request, response):
        return response
