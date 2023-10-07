import { ViewTableAddCell } from "./add_cell.js";
import { ViewTableRow } from "./row.js";
export class ViewTableAdd extends ViewTableRow {
    constructor(table) {
        super(table);
        this.cell = new ViewTableAddCell(this);
    }
}
