from django.urls import include, path
from django.views.generic import TemplateView

from .views import AdminTemplateView


urlpatterns = [
    path('', include("api.v1.urls")), # весь остальной планер
    path('', include('djoser.urls')), # базовый набор эндпоинтов пользователя
    path('auth/', include('social_django.urls', namespace='social')), # социальная авторизация
    path('auth/', include('djoser.urls.authtoken')), # авторизация по токену
    path('__receiver/', TemplateView.as_view(template_name="_receiver.html",), name='receiver'), # для маила
    path('redoc/', AdminTemplateView.as_view(
         template_name='redoc.html',), name='redoc'),
    path('__redoc/', AdminTemplateView.as_view(
         template_name='redoc.yaml',), name='redoc_yaml'),
]
