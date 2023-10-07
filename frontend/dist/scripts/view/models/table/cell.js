export class ViewTableCell {
    constructor(row) {
        this.row = row;
        this.object = $("<td>", {
            class: "task-table-cell"
        }).appendTo(this.row.object);
    }
}
