import { getParamFromUrl } from "../../api/config";
import { SpaceAPI } from "../../api/space/init";
import { ISpaceModel } from "../../api/space/interface/model";
import { UserAPI } from "../../api/user/init";
import { IUserModel } from "../../api/user/interface/model";
import { Client } from "../../client/init";
import { RedirectManager } from "../../redirect_manager/init";
import { REDIRECT_URL } from "../../redirect_manager/url";
import { IContextMenuItemConfig } from "../context/interface/item";
import { CONTEXT_MENU_TYPE } from "../context/interface/menu";
import { ContextMenu } from "../context/menu";

$(async () => {
    let space_list: ISpaceModel[] = await SpaceAPI.getMy() || [];

    if(RedirectManager.get() == RedirectManager.getUrl(REDIRECT_URL.MAIN_PAGE)) {
        $(".header-block__label_personal").toggleClass("header-block__label_inactive", false);

        $(".header-block__label_space-name").html("Не выбрано");
    }
    else if(RedirectManager.get() == RedirectManager.getUrl(REDIRECT_URL.SPACE)) {
        let current_space: ISpaceModel | boolean = await SpaceAPI.getByID(parseInt(getParamFromUrl("id")));
        if(!current_space)
            return RedirectManager.redirect(REDIRECT_URL.MAIN_PAGE);

        $(".header-block__label_space-name").html((current_space as ISpaceModel).name);
    }
    else {
        $(".header-block__label_space-name").html("Не выбрано");
    }

    $(".header-block__label_personal").on("click", () => {
        RedirectManager.redirect(REDIRECT_URL.MAIN_PAGE);
    });

    const profile = await UserAPI.getMe() as IUserModel;

    $(".header-block__label_username").html(profile.username);

    $(".header-block_user").on("click contextmenu", (e) => {
        e.preventDefault();

        new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.DEFAULT, [
            {text: "Управление аккаунтом:"},
            {text: "Мой профиль", icon_url: "account.svg", is_active: true, callback: myProfile},
            {text: "Настройки аккаунта", is_active: true, callback: userSettings},
            {text: ""},
            {text: "<span style='color: rgb(175, 52, 52);'>Выход</span>", is_active: true, callback: logOut},
        ]);
    });

    $(".header-block_space").on("click contextmenu", (e) => {
        e.preventDefault();

        let list: IContextMenuItemConfig[] = [
            {text: "Мои пространства:"},
            {text: "Создать новое", icon_url: "plus.svg", is_active: true},
            {text: ""}
        ];
        for(const space of space_list) {
            list.push({text: space.name, is_active: true,
            callback: async () => {
                RedirectManager.redirect(REDIRECT_URL.SPACE, `id=${space.id}`);

                return true;
            }});
        }

        new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.DEFAULT, list);
    });
});

async function myProfile(): Promise<boolean> {
    RedirectManager.redirect(REDIRECT_URL.PROFILE);

    return true;
}

async function userSettings(): Promise<boolean> {
    RedirectManager.redirect(REDIRECT_URL.USER_SETTINGS);

    return true;
}

async function logOut(): Promise<boolean> {
    Client.clearToken();
    RedirectManager.redirect(REDIRECT_URL.AUTH);

    return true;
}