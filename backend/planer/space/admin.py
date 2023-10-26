from django.contrib import admin

from space.models import SpaceModel, UserSpaceModel


class StaffInline(admin.TabularInline):
    model = UserSpaceModel
    extra = 0


@admin.register(SpaceModel)
class SpaceAdmin(admin.ModelAdmin):
    """Отображение пространств в админ-панеле."""
    list_display = ("id", "name", "admin")
    list_filter = ("name", "admin", "staff")
    search_fields = ("name", "admin__username",)
    inlines = [StaffInline,]
