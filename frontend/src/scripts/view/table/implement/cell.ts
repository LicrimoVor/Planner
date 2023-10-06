import { IViewTableCell } from "../interface/cell";
import { ViewTableAdd } from "./add";
import { ViewTableHeader } from "./header";
import { ViewTableRow } from "./row";
import { ViewTableTask } from "./task";

export class ViewTableCell implements IViewTableCell {
    object: JQuery<HTMLElement>;
    row: ViewTableRow;
    key_name: string;

    constructor(row: ViewTableRow, key_name: string) {
        this.row = row;
        this.key_name = key_name;

        this.object = $("<td>", {
            class: "task-table-cell"
        }).appendTo(this.row.object);
        if(this.key_name)
            this.object.toggleClass(`task-table-cell_${this.key_name}`);
    }
}