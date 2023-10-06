import { UserAPI } from "../../api/user/init";
import { IUserModel } from "../../api/user/interface/model";
import { Client } from "../../client/init";
import { RedirectManager } from "../../redirect_manager/init";
import { REDIRECT_URL } from "../../redirect_manager/url";
import { LoadingCircle } from "../loading/init";

let auth_result = undefined;

$(async function () {
    $(".form_auth").on("submit", submitAuthForm);
});

// 1q2w3e4r5tT
async function submitAuthForm(event: JQuery.Event) {
    event.preventDefault();

    if(auth_result != undefined) return;

    auth_result = NaN;

    const loading_circle = new LoadingCircle();
    loading_circle.show();

    const data: IUserModel = {
        username: $(".form_auth [name=username]").val() as string,
        password: $(".form_auth [name=password]").val() as string
    };

    auth_result = await UserAPI.getAuthToken(data.username, data.password);

    loading_circle.hide();
    
    if(!auth_result) {
        $(".form__error").html("Неверный логин или пароль!");
    }
    else {
        $(".form__error").html("");
        Client.setToken(auth_result);
        RedirectManager.redirect(REDIRECT_URL.MAIN_PAGE);
    }

    auth_result = undefined;
}