import { ViewTableCell } from "./cell.js";
export class ViewTableCellStatus extends ViewTableCell {
    constructor(row, data = { name: "", color: "transparent" }) {
        super(row);
        this.object.addClass("task-table-cell_status");
        if (!data)
            return;
        this.update(data);
    }
    update(data) {
        if (!this.status) {
            this.status = $("<p>", {
                class: "trait",
                html: data.name,
                css: { "--trait-bg-color": data.color, display: "none" }
            }).appendTo(this.object);
            $().appendTo;
            this.status.show(50);
        }
        else
            this.status.html(data.name).css("--trait-bg-color", data.color);
        return this;
    }
}
