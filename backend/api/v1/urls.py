from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.v1.views.space_task import (SpaceTaskSet, SpaceSubTaskView,
                                     HistoryTaskView, HistoryView,
                                     SpaceTaskMeView, )
from api.v1.views.personal_task import PersonalTaskSet, PersonalSubTaskView, PersonalTaskTreeView
from api.v1.views.space import SpaceMeView, SpaceSet
from api.v1.views.status import StatusSet
from api.v1.views.tag import TagSet


router = DefaultRouter()
router.register("tags", TagSet, basename="tags")
router.register("status", StatusSet, basename="status")
router.register(r"space/(?P<space_id>\d+)/task",
                SpaceTaskSet, basename="space_task")
router.register("space", SpaceSet, basename="space")
router.register("task_me", PersonalTaskSet, basename="task_me")


urlpatterns = [
     path("space/me/", SpaceMeView.as_view(), name="space_me"),
     path("space/<int:space_id>/task/<int:task_id>/subtasks/",
          SpaceSubTaskView.as_view(), name="sub_person_task"),
     path("space/<int:space_id>/task/history/",
          HistoryView.as_view(), name="history"),
     path("space/<int:space_id>/task/<int:task_id>/history/",
          HistoryTaskView.as_view(), name="history_task"),
     path("task_me/<int:task_id>/subtasks/",
          PersonalSubTaskView.as_view(), name="sub_person_task"),
     path("task_me/<int:task_id>/all_tree/",
          PersonalTaskTreeView.as_view(), name="person_task_tree"),
     path("task_me/space/",
          SpaceTaskMeView.as_view(), name="space_me_task"),
     path("", include(router.urls)),
]
