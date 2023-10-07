import { ViewTableCellHeader, ViewTableRowHeader } from "./table/header.js";
export class ViewTable {
    constructor(parent, header_cells) {
        this.rows = [];
        this.object = $("<table>", {
            class: "task-table"
        }).appendTo(parent);
        // Создание хейдера
        this.header = new ViewTableRowHeader(this);
        for (const header_cell of header_cells) {
            new ViewTableCellHeader(this.header, ...header_cell);
        }
    }
    destroy() {
        this.object.remove();
    }
}
