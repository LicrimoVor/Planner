import { UserAPI } from "../api/user/init";
import { Client } from "../client/init";
import { RedirectManager } from "../redirect_manager/init";
import { REDIRECT_URL } from "../redirect_manager/url";

const includes = $("[data-include]");
    $.each(includes, function () {
        const file = "/frontend/html/views/" + $(this).data("include") + ".html";
        $(this).load(file);
    });

window.onload = async function () {
    if(window.location.pathname.includes(REDIRECT_URL.REGISTER) || window.location.pathname.includes(REDIRECT_URL.AUTH)) {
        
        if(Client.getToken())
            return RedirectManager.redirect(REDIRECT_URL.MAIN_PAGE);
    }
    else {
        
        if(!await UserAPI.getMe()) {
            console.log("redirect");
            Client.clearToken();
            return RedirectManager.redirect(REDIRECT_URL.AUTH);
        }
    }
};