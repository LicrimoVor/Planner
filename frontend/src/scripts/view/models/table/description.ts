import { IViewTableCell, ViewTableCell } from "./cell";
import { ViewTableRow } from "./row";

export interface IViewTableCellDescription extends IViewTableCell {
    /**
     * Описание
     */
    label: JQuery<HTMLElement>;

    /**
     * Изменить текст описания
     * @param text Текст описания
     */
    setText(text: string): ViewTableCellDescription;
}

export class ViewTableCellDescription extends ViewTableCell implements IViewTableCellDescription {
    label: JQuery<HTMLElement>;

    constructor(row: ViewTableRow, text: string = "") {
        super(row);
        this.object.addClass("task-table-cell_description");

        this.label = $("<p>", {
            class: "task-table-cell__label",
            html: text
        }).appendTo(this.object);
    }

    setText(text: string): ViewTableCellDescription {
        this.label.html(text);
        return this;
    }

}