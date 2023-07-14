from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from organizations.models import UserOrgModel

User = get_user_model()


class UserOrgInline(admin.TabularInline):
    model = UserOrgModel
    extra = 0
    verbose_name_plural = "Организации"


class UserAdmin(admin.ModelAdmin):
    """Отображение пользователей в панеле администратора."""

    list_filter = ('email', 'username')
    inlines = [UserOrgInline,]
    verbose_name_plural = "Пользователи"

admin.site.unregister(Group)
admin.site.register(User, UserAdmin)
