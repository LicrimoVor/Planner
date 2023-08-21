from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('redoc/', TemplateView.as_view(
         template_name='redoc.html',), name='redoc'),
    path('', include("api.v1.urls")),
    path('', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]
