import { getParamFromUrl } from "../../api/config.js";
import { SpaceAPI } from "../../api/space/init.js";
import { UserAPI } from "../../api/user/init.js";
import { Client } from "../../client/init.js";
import { RedirectManager } from "../../redirect_manager/init.js";
import { REDIRECT_URL } from "../../redirect_manager/url.js";
import { CONTEXT_MENU_TYPE } from "../context/interface/menu.js";
import { ContextMenu } from "../context/menu.js";
$(async () => {
    let space_list = await SpaceAPI.getMy() || [];
    if (RedirectManager.get() == RedirectManager.getUrl(REDIRECT_URL.MAIN_PAGE)) {
        $(".header-block__label_personal").toggleClass("header-block__label_inactive", false);
        $(".header-block__label_space-name").html("Не выбрано");
    }
    else {
        let current_space = await SpaceAPI.getByID(parseInt(getParamFromUrl("id")));
        if (!current_space)
            return RedirectManager.redirect(REDIRECT_URL.MAIN_PAGE);
        $(".header-block__label_space-name").html(current_space.name);
    }
    $(".header-block__label_personal").on("click", () => {
        RedirectManager.redirect(REDIRECT_URL.MAIN_PAGE);
    });
    const profile = await UserAPI.getMe();
    $(".header-block__label_username").html(profile.username);
    $(".header-block_user").on("click contextmenu", (e) => {
        e.preventDefault();
        new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.DEFAULT, [
            { text: "Управление аккаунтом:" },
            { text: "Мой профиль", icon_url: "account.svg", is_active: true, callback: myProfile },
            { text: "Настройки аккаунта", is_active: true, callback: userSettings },
            { text: "" },
            { text: "<span style='color: rgb(175, 52, 52);'>Выход</span>", is_active: true, callback: logOut },
        ]);
    });
    $(".header-block_space").on("click contextmenu", (e) => {
        e.preventDefault();
        let list = [
            { text: "Мои пространства:" },
            { text: "Создать новое", icon_url: "plus.svg", is_active: true },
            { text: "" }
        ];
        for (const space of space_list) {
            list.push({ text: space.name, is_active: true,
                callback: async () => {
                    RedirectManager.redirect(REDIRECT_URL.SPACE, `id=${space.id}`);
                    return true;
                } });
        }
        new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.DEFAULT, list);
    });
});
async function myProfile() {
    RedirectManager.redirect(REDIRECT_URL.PROFILE);
    return true;
}
async function userSettings() {
    RedirectManager.redirect(REDIRECT_URL.USER_SETTINGS);
    return true;
}
async function logOut() {
    Client.clearToken();
    RedirectManager.redirect(REDIRECT_URL.AUTH);
    return true;
}
