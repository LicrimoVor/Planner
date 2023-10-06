import { IViewTableAdd } from "../interface/add";
import { ViewTableAddCell } from "./add_cell";
import { ViewTableRow } from "./row";
import { ViewTable } from "./table";

export class ViewTableAdd extends ViewTableRow implements IViewTableAdd {
    cell: ViewTableAddCell;

    constructor(table: ViewTable) {
        super(table);

        this.cell = new ViewTableAddCell(this);
    }
}