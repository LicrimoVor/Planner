import { CONTEXT_MENU_TYPE } from "../../../context/interface/menu.js";
import { ContextMenu } from "../../../context/menu.js";
import { ViewTableTaskCell } from "./task_cell.js";
import { ViewTableTrait } from "./trait.js";
export class ViewTableResponsible extends ViewTableTaskCell {
    constructor(row) {
        super(row, "responsible");
        this.img_add = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_new",
            src: "/frontend/html/img/plus.svg"
        }).appendTo(this.object);
        let items = [{ text: "Выберите ответственного:", is_active: false }];
        for (const user of this.row.data.responsible) {
            items.push({
                text: user.username,
                color: "#EEEEEE",
                is_active: true,
                callback: async () => {
                    if (this.row.data.responsible.map(obj => obj.id).indexOf(user.id) != -1 ||
                        !this.row.onResponsibleAdd(this.row.data.responsible.map(obj => obj.id).concat(user.id)))
                        return false;
                    this.row.data.responsible.push(user);
                    this.addTrait(user);
                    return true;
                },
            });
        }
        this.img_add.on("click", (e) => {
            new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.TAGS, items);
        });
        for (const user of this.row.data.responsible) {
            this.addTrait(user);
        }
    }
    addTrait(data) {
        const trait = new ViewTableTrait({
            color: "#EEEEEE",
            text: data.username,
            is_removable: true,
            onRemove: async () => {
                if (!this.row.onResponsibleRemove(this.row.data.responsible.filter(obj => obj.id != data.id).map(obj => obj.id)))
                    return false;
                this.row.data.responsible = this.row.data.responsible.filter(obj => obj.id != data.id);
                return true;
            }
        });
        trait.object.insertBefore(this.img_add);
        return this;
    }
}
