export class ViewTableRow {
    constructor(table) {
        this.table = table;
        this.object = $("<tr>", {
            class: "task-table-row"
        }).appendTo(this.table.object);
    }
}
