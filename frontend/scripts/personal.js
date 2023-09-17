
import { User } from "./api/user.js";
import { Organization } from "./api/organization.js";
import { getApiUrl } from "./api/config.js";

$(document).ready(() => {
    User.getCurrentProfile();
    // Organization.getCurrentList();

    $.ajax({
        url: getApiUrl("/api/task_me/"),
        type: "GET",
        headers: {Authorization: User.getTokenString()},
        success: (data) => {
            console.log(data);
        },
        error: () => {
            console.log("ERROR! ОШИБКА АВТОРИЗАЦИИ!");
        }
    });
});