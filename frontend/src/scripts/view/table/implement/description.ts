import { IViewTableDescription } from "../interface/description";
import { ViewTableTask } from "./task";
import { ViewTableTaskCell } from "./task_cell";

export class ViewTableDescription extends ViewTableTaskCell implements IViewTableDescription {
    input: JQuery<HTMLElement>;

    constructor(row: ViewTableTask) {
        super(row, "description");

        this.input = $("<input>", {
            type: "text",
            class: "task-table-cell__input",
            value: this.row.data.description
        }).appendTo(this.object);

        // Событие изменения текста в поле для описания
        this.input.on("change", () => {
            if(this.row.data.description == this.input.val() ||
            this.row.onDescriptionChange(this.input.val() as string)) return;

            this.row.data.description = this.input.val() as string;
        });

        // Бинды
        this.input.on("keydown", (e) => {
            if(e.key == "Enter") {
                this.blur();
            }
            else if(e.key == "Escape") {
                this.input.val(this.row.data.name);
                this.blur();
            }
        });
    }

    focus(): ViewTableDescription {
        this.input.trigger("focus");
        this.input.val("");
        this.input.val(this.row.data.description);

        return this;
    }

    blur(): ViewTableDescription {
        this.input.trigger("blur");

        return this;
    }
}