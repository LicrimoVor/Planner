import { ViewTableCell } from "./cell.js";
export class ViewTableHeaderCell extends ViewTableCell {
    constructor(row, data) {
        super(row, data[0]);
        this.label = $("<p>", {
            class: "task-table-cell__label",
            html: data[1]
        }).appendTo(this.object);
        this.resize = $("<div>", {
            class: "task-table-cell__resize"
        }).appendTo(this.object);
    }
}
