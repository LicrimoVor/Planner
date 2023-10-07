import { ViewTableCell } from "./cell.js";
export class ViewTableCellAdd extends ViewTableCell {
    constructor(row, text = "") {
        super(row);
        this.object.addClass("task-table-cell_add");
        // this.object.addClass("task-table-cell_deadline");
        this.img_add = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_new",
            src: "/frontend/html/img/plus.svg"
        }).appendTo(this.object);
        this.label = $("<p>", {
            class: "task-table-cell__label",
            html: text
        }).appendTo(this.object);
    }
}
