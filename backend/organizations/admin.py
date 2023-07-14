from django.contrib import admin

from organizations.models import OrgModel, UserOrgModel


class StaffInline(admin.TabularInline):
    model = UserOrgModel
    extra = 0


class OrgAdmin(admin.ModelAdmin):
    """Отображение организаций в админ-панеле."""
    list_display = ("id", "name", "admin")
    list_filter = ("name", "admin")
    inlines = [StaffInline,]


admin.site.register(OrgModel, OrgAdmin)
