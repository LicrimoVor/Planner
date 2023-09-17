
import { getApiUrl } from "./config.js";

const API_URLS = {
    AUTH_TOKEN: "/api/auth/token/login/",
    REGISTER_USER: "/api/users/",

    CURRENT_PROFILE: "/api/users/me/",
}

export const User = {
    // Очистка токена авторизации
    clearAuthToken: () => {
        localStorage.setItem("token", "");
    },

    // Получение токена в виде для хейдера
    getTokenString: () => {
        return "Token " + localStorage.getItem("token");
    },

    // POST-запрос на получение токена пользователя по его логину и паролю
    getAuthToken: (username, password, callback) => {
        $.post(getApiUrl(API_URLS.AUTH_TOKEN), {username: username, password: password}).done((data) => {
            const token = data.auth_token;
            localStorage.setItem("token", token);
            callback();
        }).fail(() => {
            callback("Error!");
        });
    },

    // Получить профиль пользователя по текущему токену авторизации
    getCurrentProfile: () => {
        $.ajax({
            url: getApiUrl(API_URLS.CURRENT_PROFILE),
            type: "GET",
            headers: {Authorization: User.getTokenString()},
            success: (data) => {
                console.log(data);
            },
            error: () => {
                console.log("ERROR! НЕ УДАЛОСЬ ЗАГРУЗИТЬ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ!");
            }
        });
    },

    // POST-запрос на создание нового профиля в БД
    createProfile: (username, password, email, first_name, last_name, id_telegram, callback) => {
        
        console.log(getApiUrl(API_URLS.REGISTER_USER));
        $.post(getApiUrl(API_URLS.REGISTER_USER), {
            username: username,
            password: password,
            email: email,
            first_name: first_name,
            last_name: last_name,
            id_telegram: id_telegram
        }).done((data) => {
            console.log("suc");
            console.log(data);
        }).fail((data) => {
            callback(JSON.parse(data.responseText));
        });
    }
}