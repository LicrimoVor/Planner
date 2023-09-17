
import { User } from "./api/user.js";

$(document).ready(() => {
    User.clearAuthToken(); // Чистим токен авторизации

    const form = $(".register-form");

    for(let input of form.children("input")) {
        const error =$("." + $(input).attr("class").split(" ")[0] + "-error");
        $(input).on("input", () => {
            console.log(error.text());
            if(error.text().length > 0) {
                error.html("");
            }
        });
    }

    form.submit((event) => {
        const username = form.children(".register-form__username").val();
        const password = form.children(".register-form__password").val();
        const email = form.children(".register-form__email").val();
        const first_name = form.children(".register-form__firstname").val();
        const last_name = form.children(".register-form__lastname").val();
        const id_telegram = form.children(".register-form__telegram").val();

        User.createProfile(username, password, email, first_name, last_name, id_telegram, (data) => {
            $(".register-form__username-error").html(data.username || "");
            $(".register-form__email-error").html(data.email || "");
            $(".register-form__firstname-error").html(data.first_name || "");
            $(".register-form__lastname-error").html(data.last_name || "");
            $(".register-form__password-error").html(data.password || "");
        });

        return event.preventDefault();
    });
});


