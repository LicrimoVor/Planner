import { ViewTableHeaderCell } from "./header_cell.js";
import { ViewTableRow } from "./row.js";
export class ViewTableHeader extends ViewTableRow {
    constructor(table, data) {
        super(table);
        this.object.toggleClass("task-table-row_header", true);
        for (const item of data) {
            new ViewTableHeaderCell(this, item);
        }
    }
}
