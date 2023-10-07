import { ViewTableCell } from "./cell.js";
export class ViewTableAddCell extends ViewTableCell {
    constructor(row) {
        super(row, "add");
        this.img_add = $("<img>", {
            class: "task-table-cell__img_new",
            src: "/frontend/html/img/plus.svg"
        }).appendTo(this.object);
        this.label = $("<p>", {
            class: "task-table-cell__label",
            html: "Добавить новую задачу..."
        }).appendTo(this.object);
        this.object.on("click", async () => {
            if (!await this.row.table.onAdd())
                return;
        });
    }
}
