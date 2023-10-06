import { ContextMenu } from "./menu";
import { IContextMenuItem, IContextMenuItemConfig } from "./interface/item";

export class ContextMenuItem implements IContextMenuItem {
    object: JQuery<HTMLElement>;
    menu: ContextMenu;
    label: JQuery<HTMLElement>;
    icon: JQuery<HTMLElement>;

    constructor(data: IContextMenuItemConfig, menu: ContextMenu) {
        this.menu = menu;
        this.object = $("<p>", {
            class: "context-menu-item"
        }).appendTo(this.menu.object);

        if(data.icon_url) {
            this.icon = $("<img>", {
                class: "context-menu-item__icon",
                src: `/frontend/html/img/${data.icon_url}`
            }).appendTo(this.object);
        }

        this.label = $("<p>", {
            class: "context-menu-item__label",
            html: data.text,
        }).appendTo(this.object);
        if(data.color) this.label.css("--trait-color", data.color);

        data.is_active = data.is_active == true;
        if(!data.is_active)
            this.object.toggleClass("context-menu-item_inactive");

        if(data.callback) this.object.on("click", (e) => {
            if(data.callback()) this.menu.destroy();
        });
        
    }
}