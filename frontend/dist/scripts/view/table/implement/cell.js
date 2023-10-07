export class ViewTableCell {
    constructor(row, key_name) {
        this.row = row;
        this.key_name = key_name;
        this.object = $("<td>", {
            class: "task-table-cell"
        }).appendTo(this.row.object);
        if (this.key_name)
            this.object.toggleClass(`task-table-cell_${this.key_name}`);
    }
}
