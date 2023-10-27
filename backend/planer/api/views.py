from django.views.generic import TemplateView
from django.http import HttpResponse


class AdminTemplateView(TemplateView):
    """Возвращает страницу только с правами администратора."""
    
    def get(self, request, *args, **kwargs):
        user = request.user
        if not user.is_staff:
            return HttpResponse("Вы не является администратором сайта.")
        return super().get(request, *args, **kwargs)
