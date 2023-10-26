from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from task.models import (TagModel, PersonalTaskModel,
                         StatusModel, ResponsibleSpaceTasks,
                         SpaceTaskModel, TagSpaceTaskModel,
                         TagPersonalTaskModel,)


class TagSpaceTaskInline(admin.TabularInline):
    model = TagSpaceTaskModel
    extra = 0
    verbose_name_plural = "Теги"


class TagPersonalTaskInline(admin.TabularInline):
    model = TagPersonalTaskModel
    extra = 0
    verbose_name_plural = "Теги"

class ResponsibleSpaceTasksAdmin(admin.TabularInline):
    model = ResponsibleSpaceTasks
    extra = 0
    verbose_name_plural = "Ответственные"


@admin.register(TagModel)
class TagAdmin(admin.ModelAdmin):
    """Отображение тегов в админ-панеле."""
    list_display = ("id", "name", 'color_fun')
    search_fields = ('name', )

    def color_fun(self, obj):
        return obj.color_html

    color_fun.short_description = "Цвет"
    list_filter = ("name",)


@admin.register(StatusModel)
class StatusAdmin(admin.ModelAdmin):
    """Отображение статусов в админ-панеле."""
    list_display = ("id", "name", 'color_fun')
    search_fields = ('name', )

    def color_fun(self, obj):
        return obj.color_html

    color_fun.short_description = "Цвет"
    list_filter = ("name",)


@admin.register(PersonalTaskModel)
class PersonalTaskAdmin(admin.ModelAdmin):
    """Отображение персональных задач в админ-панеле."""
    list_display = ("id", "name", "author", "status", "deadline")
    list_filter = ("name", "author", "status", "deadline")
    search_fields = ['name', 'author__username']
    inlines = [TagPersonalTaskInline, ]


@admin.register(SpaceTaskModel)
class SpaceTaskAdmin(SimpleHistoryAdmin):
    """Отображение задач простравства в админ-панеле."""
    list_display = ("id", "name", "author", "status", "deadline")
    list_filter = ("name", "author", "status", "deadline")
    history_list_display = ["status"]
    inlines = [TagSpaceTaskInline, ResponsibleSpaceTasksAdmin,]
    search_fields = ['name', 'author__username']
