import { ViewTableCell } from "./cell.js";
export class ViewTableCellDescription extends ViewTableCell {
    constructor(row, text = "") {
        super(row);
        this.object.addClass("task-table-cell_description");
        this.label = $("<p>", {
            class: "task-table-cell__label",
            html: text
        }).appendTo(this.object);
    }
    setText(text) {
        this.label.html(text);
        return this;
    }
}
