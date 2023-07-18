from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from task.models import (TagModel, PersonalTaskModel,
                         StatusModel, SubOrgTasksM2M,
                         SubPersonalTasksM2M, ResponsibleOrgTasks,
                         OrgTaskModel, TagOrgTaskModel,
                         TagPersonalTaskModel,)


class TagOrgTaskInline(admin.TabularInline):
    model = TagOrgTaskModel
    extra = 0
    verbose_name_plural = "Теги"


class TagPersonalTaskInline(admin.TabularInline):
    model = TagPersonalTaskModel
    extra = 0
    verbose_name_plural = "Теги"


class SubOrgTaskInline(admin.TabularInline):
    model = SubOrgTasksM2M
    extra = 0
    verbose_name_plural = "Подзадачи"
    fk_name = "task"


class SubPersonalTaskInline(admin.TabularInline):
    model = SubPersonalTasksM2M
    extra = 0
    verbose_name_plural = "Подзадачи"
    fk_name = "task"


class ResponsibleOrgTasksAdmin(admin.TabularInline):
    model = ResponsibleOrgTasks
    extra = 0
    verbose_name_plural = "Ответственные"


class TagAdmin(admin.ModelAdmin):
    """Отображение тегов в админ-панеле."""
    list_display = ("id", "name", 'color_fun')

    def color_fun(self, obj):
        return obj.color_html

    color_fun.short_description = "Цвет"
    list_filter = ("name",)


class StatusAdmin(admin.ModelAdmin):
    """Отображение статусов в админ-панеле."""
    list_display = ("id", "name", 'color_fun')

    def color_fun(self, obj):
        return obj.color_html

    color_fun.short_description = "Цвет"
    list_filter = ("name",)


class PersonalTaskAdmin(admin.ModelAdmin):
    """Отображение персональных задач в админ-панеле."""
    list_display = ("id", "name", "author", "status", "deadline")
    list_filter = ("name", "author", "status", "deadline")
    inlines = [TagPersonalTaskInline, SubPersonalTaskInline ]


class OrgTaskAdmin(SimpleHistoryAdmin):
    """Отображение задач организации в админ-панеле."""
    list_display = ("id", "name", "author", "status", "deadline")
    list_filter = ("name", "author", "status", "deadline")
    history_list_display = ["status"]
    inlines = [TagOrgTaskInline, ResponsibleOrgTasksAdmin, SubOrgTaskInline,]
    search_fields = ['name', 'author__username']



admin.site.register(TagModel, TagAdmin)
admin.site.register(StatusModel, StatusAdmin)
admin.site.register(PersonalTaskModel, PersonalTaskAdmin)
admin.site.register(OrgTaskModel, OrgTaskAdmin)
