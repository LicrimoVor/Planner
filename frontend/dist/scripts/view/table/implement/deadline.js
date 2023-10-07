import { ViewTableTaskCell } from "./task_cell.js";
export class ViewTableDeadline extends ViewTableTaskCell {
    constructor(row) {
        super(row, "deadline");
        this.label = $("<p>", {
            class: "task-table-cell__label"
        }).appendTo(this.object);
        this.input = $("<input>", {
            type: "datetime-local",
            class: "task-table-cell__input task-table-cell__input_deadline"
        }).appendTo(this.object);
        this.input.on("change", () => {
            if (!this.row.onDeadlineChange(this.input.val()))
                return;
            this.row.data.deadline = this.input.val();
            this.setData(this.input.val());
        });
        if (this.row.data.deadline)
            this.setData(this.row.data.deadline);
    }
    setData(new_deadline) {
        let date = new Date(new_deadline);
        this.label.html(date.toLocaleString().slice(0, date.toLocaleString().indexOf(",")));
        return this;
    }
}
