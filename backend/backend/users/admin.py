from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from space.models import UserSpaceModel

User = get_user_model()


class UserSpaceInline(admin.TabularInline):
    model = UserSpaceModel
    extra = 0
    verbose_name_plural = "Пространства"


class UserAdmin(admin.ModelAdmin):
    """Отображение пользователей в панеле администратора."""

    list_filter = ('email', 'username')
    inlines = [UserSpaceInline,]
    verbose_name_plural = "Пользователи"

admin.site.unregister(Group)
admin.site.register(User, UserAdmin)
