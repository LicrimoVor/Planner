
import { User } from "./api/user.js";

$(document).ready(() => {
    User.clearAuthToken(); // Чистим токен авторизации

    const form = $(".auth-form");

    form.submit((event) => {
        const username = form.children(".auth-form__username").val();
        const password = form.children(".auth-form__password").val();

        User.getAuthToken(username, password, (e) => { // Делаем запрос на поиск пользователя с такими данными
            if(e) {
                $(".auth-form__error").html("Неверный логин или пароль!");
                return;
            }
            
            window.location = "/frontend/personal.html";
        });

        return event.preventDefault();
    });
});


