import { ViewTableCell } from "./cell.js";
export class ViewTableCellDeadline extends ViewTableCell {
    constructor(row, text = "") {
        super(row);
        this.object.addClass("task-table-cell_deadline");
        this.label = $("<p>", {
            class: "task-table-cell__label",
            html: text
        }).appendTo(this.object);
        // this.img_date = $("<img>", {
        //     class: "task-table-cell__img task-table-cell__img_date",
        //     src: "/frontend/html/img/date.svg"
        // }).appendTo(this.object);
        this.input = $("<input>", {
            class: "task-table-cell__input task-table-cell__input_deadline",
            type: "datetime-local"
        }).appendTo(this.object);
        this.input.on("change", async () => {
            if (this.onChange && !await this.onChange())
                return;
            this.input.trigger("blur");
        });
    }
    setText(text) {
        this.label.html(text);
        return this;
    }
}
