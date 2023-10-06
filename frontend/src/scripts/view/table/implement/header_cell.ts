import { IViewTableHeaderCell } from "../interface/header_cell";
import { ViewTableCell } from "./cell";
import { ViewTableHeader } from "./header";

export class ViewTableHeaderCell extends ViewTableCell implements IViewTableHeaderCell {
    row: ViewTableHeader;
    label: JQuery<HTMLElement>;
    resize: JQuery<HTMLElement>;

    constructor(row: ViewTableHeader, data: string[]) {
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