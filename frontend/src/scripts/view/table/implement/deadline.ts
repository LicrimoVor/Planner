import { IViewTableDeadline } from "../interface/deadline";
import { ViewTableTask } from "./task";
import { ViewTableTaskCell } from "./task_cell";

export class ViewTableDeadline extends ViewTableTaskCell implements IViewTableDeadline {
    label: JQuery<HTMLElement>;
    input: JQuery<HTMLElement>;

    constructor(row: ViewTableTask) {
        super(row, "deadline");

        this.label = $("<p>", {
            class: "task-table-cell__label"
        }).appendTo(this.object);

        this.input = $("<input>", {
            type: "datetime-local",
            class: "task-table-cell__input task-table-cell__input_deadline"
        }).appendTo(this.object);
        
        this.input.on("change", () => {
            if(!this.row.onDeadlineChange(this.input.val() as number)) return;

            this.row.data.deadline = this.input.val() as number;
            this.setData(this.input.val() as number);
        });

        if(this.row.data.deadline)
            this.setData(this.row.data.deadline);
    }

    setData(new_deadline: number): ViewTableDeadline {
        let date = new Date(new_deadline);
        this.label.html(date.toLocaleString().slice(0, date.toLocaleString().indexOf(",")));

        return this;
    }
}