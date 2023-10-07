import { ViewTableAdd } from "./add.js";
import { ViewTableHeader } from "./header.js";
export class ViewTable {
    constructor(config) {
        this.tasks = [];
        this.object = $("<table>", {
            class: "task-table"
        }).appendTo(".task-wrapper");
        this.is_personal = config.is_personal;
        this.status_list = config.status_list;
        this.tags_list = config.tags_list;
        this.staff_list = config.staff_list;
        this.onAdd = config.onAdd;
        new ViewTableHeader(this, config.header);
        this.add = new ViewTableAdd(this);
    }
    clear() {
        $.each(this.tasks, function () {
            this.destroy();
        });
        return this;
    }
}
