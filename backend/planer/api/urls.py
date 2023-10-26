from django.urls import include, path
from django.views.generic import TemplateView

urlpatterns = [
    path('', include("api.v1.urls")),
    path('', include('djoser.urls')),
    path('auth/', include('social_django.urls', namespace='social')),
    path('auth/', include('djoser.urls.authtoken')),
    path('__receiver/', TemplateView.as_view(template_name="_receiver.html",), name='receiver'), #для маила
    path('redoc/', TemplateView.as_view(
         template_name='redoc.html',), name='redoc'),
    path('__redoc/', TemplateView.as_view(
         template_name='redoc.yaml',), name='redoc_yaml'),
]
