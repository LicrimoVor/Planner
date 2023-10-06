import { IViewTableHeader } from "../interface/header";
import { ViewTableHeaderCell } from "./header_cell";
import { ViewTableRow } from "./row";
import { ViewTable } from "./table";

export class ViewTableHeader extends ViewTableRow implements IViewTableHeader {


    constructor(table: ViewTable, data: string[][]) {
        super(table);

        this.object.toggleClass("task-table-row_header", true);

        for(const item of data) {
            new ViewTableHeaderCell(this, item);
        }
    }
}