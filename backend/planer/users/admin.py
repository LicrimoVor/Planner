from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from social_django.models import Nonce, Association, UserSocialAuth
from social_django.admin import UserSocialAuthOption

from space.models import UserSpaceModel
from users.models import Profile

admin.site.unregister(Nonce)
admin.site.unregister(Association)
admin.site.unregister(Group)

UserSocialAuth._meta.verbose_name = "Социальный пользователь"
UserSocialAuth._meta.verbose_name_plural = "Социальные пользователи"
UserSocialAuth._meta.app_label = "users"
UserSocialAuthOption.exclude = ("extra_data",)

User = get_user_model()


class ProfileInline(admin.StackedInline):
    model = Profile
    extra = 0
    verbose_name_plural = "Профиль пользователя"


class UserSpaceInline(admin.TabularInline):
    model = UserSpaceModel
    extra = 0
    verbose_name_plural = "Пространства"


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """Отображение пользователей в панеле администратора."""

    list_filter = ('email', 'username')
    inlines = [UserSpaceInline, ProfileInline]
    verbose_name_plural = "Пользователи"
    list_display = ("id","username", "first_name", "last_name", "is_staff", "email")


admin.site.site_title = "Lol"
admin.site.index_title = "Типо админ-панелька"
