import { Client } from "../client/init";
import { RedirectManager } from "../redirect_manager/init";
import { REDIRECT_URL } from "../redirect_manager/url";

window.onload = function () {
    if(window.location.pathname.includes(REDIRECT_URL.REGISTER) || window.location.pathname.includes(REDIRECT_URL.AUTH)) {
        if(Client.getToken())
            return RedirectManager.redirect(REDIRECT_URL.MAIN_PAGE);
    }
    else {
        if(!Client.getToken())
            return RedirectManager.redirect(REDIRECT_URL.AUTH);
    }
}

$(function () {
    const includes = $("[data-include]");
    $.each(includes, function () {
        const file = "/frontend/html/views/" + $(this).data("include") + ".html";
        $(this).load(file);
    });
});