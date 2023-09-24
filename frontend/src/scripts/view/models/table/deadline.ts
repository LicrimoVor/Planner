import { IViewTableCell, ViewTableCell } from "./cell";
import { ViewTableRow } from "./row";

export interface IViewTableCellDeadline extends IViewTableCell {
    /**
     * Дата
     */
    label: JQuery<HTMLElement>;

    /**
     * Кнопка "Выбрать дату"
     */
    img_date: JQuery<HTMLElement>;

    /**
     * Изменить текст даты
     * @param text Текст даты
     */
    setText(text: string): ViewTableCellDeadline;
}

export class ViewTableCellDeadline extends ViewTableCell implements IViewTableCellDeadline {
    label: JQuery<HTMLElement>;
    img_date: JQuery<HTMLElement>;

    constructor(row: ViewTableRow, text: string = "") {
        super(row);
        this.object.addClass("task-table-cell_deadline");

        this.label = $("<p>", {
            class: "task-table-cell__label",
            html: text
        }).appendTo(this.object);

        this.img_date = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_date",
            src: "/frontend/html/img/date.svg"
        }).appendTo(this.object);
    }

    setText(text: string): ViewTableCellDeadline {
        this.label.html(text);
        return this;
    }

}