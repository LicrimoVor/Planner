import { CONTEXT_MENU_TYPE } from "../../../context/interface/menu.js";
import { ContextMenu } from "../../../context/menu.js";
import { ViewTableTaskCell } from "./task_cell.js";
import { ViewTableTrait } from "./trait.js";
export class ViewTableStatus extends ViewTableTaskCell {
    constructor(row) {
        super(row, "status");
        let items = [{ text: "Выберите статус:", is_active: false }];
        for (const status of this.row.table.status_list) {
            items.push({
                text: status.name,
                color: status.color,
                is_active: true,
                callback: async () => {
                    if (!this.row.onStatusChange(status.id))
                        return false;
                    this.setData(status);
                    return true;
                },
            });
        }
        this.object.on("click", (e) => {
            new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.STATUS, items);
        });
        if (this.row.data.status)
            this.createTrait(this.row.data.status);
    }
    createTrait(data) {
        this.trait = new ViewTableTrait({
            color: data.color,
            text: data.name,
            is_removable: false
        });
        this.trait.object.appendTo(this.object);
        return this;
    }
    setData(new_data) {
        this.row.data.status = new_data;
        if (!this.trait)
            return this.createTrait(new_data);
        this.trait.setData({
            color: new_data.color,
            text: new_data.name
        });
        return this;
    }
}
