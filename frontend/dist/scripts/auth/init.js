import { UserAPI } from "../../api/user/init.js";
import { Client } from "../../client/init.js";
import { RedirectManager } from "../../redirect_manager/init.js";
import { REDIRECT_URL } from "../../redirect_manager/url.js";
import { LoadingCircle } from "../loading/init.js";
let auth_result = undefined;
$(async function () {
    $(".form_auth").on("submit", submitAuthForm);
});
// 1q2w3e4r5tT
async function submitAuthForm(event) {
    event.preventDefault();
    if (auth_result != undefined)
        return;
    auth_result = NaN;
    const loading_circle = new LoadingCircle();
    loading_circle.show();
    const data = {
        username: $(".form_auth [name=username]").val(),
        password: $(".form_auth [name=password]").val()
    };
    auth_result = await UserAPI.getAuthToken(data.username, data.password);
    loading_circle.hide();
    if (!auth_result) {
        $(".form__error").html("Неверный логин или пароль!");
    }
    else {
        $(".form__error").html("");
        Client.setToken(auth_result);
        RedirectManager.redirect(REDIRECT_URL.MAIN_PAGE);
    }
    auth_result = undefined;
}
