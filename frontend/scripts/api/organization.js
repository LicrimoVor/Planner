
import { getApiUrl } from "./config.js";
import { User } from "./user.js";

const API_URLS = {
    MY_LIST: "/api/organization/me/",
}

export const Organization = {
    getCurrentList: () => {
        $.ajax({
            url: getApiUrl(API_URLS.MY_LIST),
            type: "GET",
            headers: {Authorization: User.getTokenString()},
            success: (data) => {
                console.log(data);
            },
            error: () => {
                console.log("ERROR! ОШИБКА АВТОРИЗАЦИИ!");
            }
        });
    },
}