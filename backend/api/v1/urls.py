from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.v1.views.org_task import OrgTaskSet, OrgSubTaskSet, HistoryTaskView, HistoryView
from api.v1.views.personal_task import PersonalTaskSet, OrganizationTaskMeSet
from api.v1.views.orgnizations import OrganizationMeView, OrganizationSet
from api.v1.views.status import StatusSet
from api.v1.views.tag import TagSet


router = DefaultRouter()
router.register("tags", TagSet, basename="tags")
router.register("status", StatusSet, basename="status")
# router.register(r"organization/(?P<org_id>\d+)/task/(?P<task_id>\d+)/subtasks",
#                 OrgSubTaskSet, basename="org_subtask")
# router.register(r"organization/(?P<org_id>\d+)/task",
#                 OrgTaskSet, basename="org_task")
# router.register("organization", OrganizationSet, basename="organization")
# router.register("task_me/organizations", OrganizationTaskMeSet,
#                 basename="task_me_org")
# router.register("task_me", PersonalTaskSet, basename="task_me")


urlpatterns = [
    path("organization/me/", OrganizationMeView.as_view(), name="org_me"),
    path("organization/<int:org_id>/task/history/",
         HistoryView.as_view(), name="history"),
    path("organization/<int:org_id>/task/<int:tas_id>/history/",
         HistoryTaskView.as_view(), name="history_task"),
    path("", include(router.urls)),
]
