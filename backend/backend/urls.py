from django.contrib import admin
from django.conf.urls.static import static
from django.urls import include, path, re_path

from . import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # re_path('telegram/', include(('base.utrls', 'base'), namespace='base')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static(
        settings.STATIC_URL, document_root=settings.STATIC_ROOT
    )
    urlpatterns += (path('__debug__/', include('debug_toolbar.urls')),)
