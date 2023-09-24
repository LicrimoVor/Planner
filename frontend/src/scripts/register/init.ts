import { UserAPI } from "../../api/user/init";
import { IUserModel } from "../../api/user/interface/model";
import { Client } from "../../client/init";
import { RedirectManager } from "../../redirect_manager/init";
import { REDIRECT_URL } from "../../redirect_manager/url";
import { LoadingCircle } from "../loading/init";

let register_result = undefined;

$(async function () {
    $(".form_register").on("submit", submitRegisterForm);
});

// 1q2w3e4r5tT
async function submitRegisterForm(event: JQuery.Event) {
    event.preventDefault();

    if(register_result != undefined) return;

    register_result = NaN;

    const loading_circle = new LoadingCircle();
    loading_circle.show();

    const data: IUserModel = {
        username: $(".form_register [name=username]").val() as string,
        password: $(".form_register [name=password]").val() as string,
        email: $(".form_register [name=email]").val() as string,
        first_name: $(".form_register [name=first_name]").val() as string,
        last_name: $(".form_register [name=last_name]").val() as string,
        // id_telegram: $(".form_register [name=id_telegram]").val() as number
    };

    register_result = await UserAPI.register(data);

    loading_circle.hide();

    $(".form_register .form__error").each(function () {
        $(this).html("");
    });

    if(register_result == true) {
        const token = await UserAPI.getAuthToken(data.username, data.password);
        Client.setToken(token as string);
        RedirectManager.redirect(REDIRECT_URL.MAIN_PAGE);
    }
    else {
        for(const field in register_result) {
            $(`.form__error_${field}`).html(register_result[field][0]);
        }
    }

    register_result = undefined;
}