import { UserAPI } from "../../api/user/init.js";
import { Client } from "../../client/init.js";
import { RedirectManager } from "../../redirect_manager/init.js";
import { REDIRECT_URL } from "../../redirect_manager/url.js";
import { LoadingCircle } from "../loading/init.js";
let register_result = undefined;
$(async function () {
    $(".form_register").on("submit", submitRegisterForm);
});
// 1q2w3e4r5tT
async function submitRegisterForm(event) {
    event.preventDefault();
    if (register_result != undefined)
        return;
    register_result = NaN;
    const loading_circle = new LoadingCircle();
    loading_circle.show();
    const data = {
        username: $(".form_register [name=username]").val(),
        password: $(".form_register [name=password]").val(),
        email: $(".form_register [name=email]").val(),
        first_name: $(".form_register [name=first_name]").val(),
        last_name: $(".form_register [name=last_name]").val(),
        // telegram_id: $(".form_register [name=telegram_id]").val() as number
    };
    register_result = await UserAPI.register(data);
    loading_circle.hide();
    $(".form_register .form__error").each(function () {
        $(this).html("");
    });
    if (register_result == true) {
        const token = await UserAPI.getAuthToken(data.username, data.password);
        Client.setToken(token);
        RedirectManager.redirect(REDIRECT_URL.MAIN_PAGE);
    }
    else {
        for (const field in register_result) {
            $(`.form__error_${field}`).html(register_result[field][0]);
        }
    }
    register_result = undefined;
}
