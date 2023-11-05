import random

from users.models import Profile


def save_profile(backend, user, response, *args, **kwargs):
    """Создает профиль про социальной авторизации."""
    if user:
        profile, flag = Profile.objects.get_or_create(user_id=user.id)
        if flag:
            return None
        profile.gender = response.get('gender')
        profile.color = "#"+str(hex(random.randint(0, 16_581_375)))[2:].upper()
        profile.time_zone = response.get('timezone', 0)
        profile.save()
