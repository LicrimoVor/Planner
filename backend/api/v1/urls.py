from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.v1.views.space_task import OrgTaskSet, OrgSubTaskView, HistoryTaskView, HistoryView
from api.v1.views.personal_task import PersonalTaskSet, OrganizationTaskMeView, PersonalSubTaskView
from api.v1.views.spaces import OrganizationMeView, OrganizationSet
from api.v1.views.status import StatusSet
from api.v1.views.tag import TagSet


router = DefaultRouter()
router.register("tags", TagSet, basename="tags")
router.register("status", StatusSet, basename="status")
router.register(r"organization/(?P<org_id>\d+)/task",
                OrgTaskSet, basename="org_task")
router.register("organization", OrganizationSet, basename="organization")
router.register("task_me", PersonalTaskSet, basename="task_me")


urlpatterns = [
    path("organization/me/", OrganizationMeView.as_view(), name="org_me"),
    path("organization/<int:org_id>/task/<int:task_id>/subtasks/",
          OrgSubTaskView.as_view(), name="sub_person_task"),
    path("organization/<int:org_id>/task/history/",
         HistoryView.as_view(), name="history"),
    path("organization/<int:org_id>/task/<int:task_id>/history/",
         HistoryTaskView.as_view(), name="history_task"),
    path("task_me/<int:task_id>/subtasks/",
         PersonalSubTaskView.as_view(), name="sub_person_task"),
     path("task_me/organizations/",
         OrganizationTaskMeView.as_view(), name="org_me_task"),
    path("", include(router.urls)),
]
