import requests

from asgiref.sync import sync_to_async

from task.models import PersonalTaskModel, SubPersonalTasksM2M


@sync_to_async
def get_new_image(URL):
    try:
        response = requests.get(URL)
    except Exception as error:
        print(error)
    response = response.json()
    return response[0].get('url')


@sync_to_async
def get_task_queryset(user, numb_page: int, count: int):
    subtasts_id = SubPersonalTasksM2M.objects.values_list("subtask", flat=True).distinct()
    queryset = PersonalTaskModel.objects.filter(author=user).exclude(id__in=subtasts_id).order_by("-deadline")[numb_page*count:(numb_page+1)*count]
    return queryset


@sync_to_async
def get_task(user, task_id):
    model = PersonalTaskModel.objects.get(author=user, id=task_id)
    return model
