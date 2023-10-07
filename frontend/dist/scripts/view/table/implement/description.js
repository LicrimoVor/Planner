import { ViewTableTaskCell } from "./task_cell.js";
export class ViewTableDescription extends ViewTableTaskCell {
    constructor(row) {
        super(row, "description");
        this.input = $("<input>", {
            type: "text",
            class: "task-table-cell__input",
            value: this.row.data.description
        }).appendTo(this.object);
        // Событие изменения текста в поле для описания
        this.input.on("change", () => {
            if (this.row.data.description == this.input.val() ||
                this.row.onDescriptionChange(this.input.val()))
                return;
            this.row.data.description = this.input.val();
        });
        // Бинды
        this.input.on("keydown", (e) => {
            if (e.key == "Enter") {
                this.blur();
            }
            else if (e.key == "Escape") {
                this.input.val(this.row.data.name);
                this.blur();
            }
        });
    }
    focus() {
        this.input.trigger("focus");
        this.input.val("");
        this.input.val(this.row.data.description);
        return this;
    }
    blur() {
        this.input.trigger("blur");
        return this;
    }
}
