import { UserAPI } from "../../api/user/init.js";
import { LoadingCircle } from "../loading/init.js";
import { RedirectManager } from "../../redirect_manager/init.js";
import { REDIRECT_URL } from "../../redirect_manager/url.js";
let edit_result = undefined;
$(async function () {
    const profile = await UserAPI.getMe();
    const form = $(".form_user-settings");
    for (const key in profile) {
        form.children(`[name=${key}]`).val(profile[key]);
    }
    form.on("submit", async (e) => {
        e.preventDefault();
        if (edit_result != undefined)
            return;
        edit_result = NaN;
        const loading_circle = new LoadingCircle();
        loading_circle.show();
        let data = {
            first_name: form.children("[name=first_name]").val(),
            last_name: form.children("[name=last_name]").val(),
            telegram_id: form.children("[name=telegram_id]").val(),
            email: form.children("[name=email]").val(),
        };
        const current_password = form.children("[name=current_password]").val(), new_password = form.children("[name=new_password]").val();
        edit_result = await UserAPI.updateFields(data);
        edit_result = edit_result;
        if (current_password.length) {
            if (edit_result == true)
                edit_result = [];
            const result = await UserAPI.changePassword(current_password, new_password);
            if (result == true) {
                edit_result = result;
            }
            else {
                for (const field in result)
                    edit_result[field] = result[field];
            }
        }
        if (edit_result == true)
            return RedirectManager.redirect(REDIRECT_URL.USER_SETTINGS);
        loading_circle.hide();
        form.children(".form__error").each(function () {
            $(this).html("");
        });
        for (const field in edit_result) {
            form.children(`[name=${field}]`).val(profile[field]);
            form.children(`.form__error_${field}`).html(edit_result[field][0]);
        }
        edit_result = undefined;
    });
});
