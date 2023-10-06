import { IViewTableRow } from "../interface/row";
import { ViewTable } from "./table";

export class ViewTableRow implements IViewTableRow {
    object: JQuery<HTMLElement>;
    table: ViewTable;

    constructor(table: ViewTable) {
        this.table = table;

        this.object = $("<tr>", {
            class: "task-table-row"
        }).appendTo(this.table.object);
    }
}