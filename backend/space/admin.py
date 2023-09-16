from django.contrib import admin

from space.models import SpaceModel, UserSpaceModel


class StaffInline(admin.TabularInline):
    model = UserSpaceModel
    extra = 0


class SpaceAdmin(admin.ModelAdmin):
    """Отображение пространств в админ-панеле."""
    list_display = ("id", "name", "admin")
    list_filter = ("name", "admin")
    inlines = [StaffInline,]


admin.site.register(SpaceModel, SpaceAdmin)
