import { Client } from "../../client/init.js";
import { ContextMenuItem } from "./item.js";
export class ContextMenu {
    constructor(x, y, type, items) {
        this.type = type;
        this.object = $("<div>", {
            class: "context-menu",
            css: { display: "none" }
        }).appendTo($(document.body));
        this.object.addClass(`context-menu_${this.type}`);
        for (const item of items) {
            new ContextMenuItem(item, this);
        }
        $(document.documentElement).on("mousedown keydown", (e) => {
            if (e.key == "Escape" || $(e.target).closest(this.object).length === 0) {
                this.destroy();
            }
        });
        Client.openContextMenu();
        if (x + this.object.innerWidth() > $(document.documentElement).innerWidth()) {
            this.object.css({ left: `${x - this.object.innerWidth()}px` });
        }
        else {
            this.object.css({ left: `${x}px` });
        }
        if (y + this.object.innerHeight() > $(document.documentElement).innerHeight()) {
            this.object.css({ top: `${y - this.object.innerHeight()}px` });
        }
        else {
            this.object.css({ top: `${y}px` });
        }
        this.object.show(100);
    }
    destroy() {
        Client.closeContextMenu();
        this.object.hide(100, () => this.object.remove());
        return;
    }
}
