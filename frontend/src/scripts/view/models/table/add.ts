import { IViewTableCell, ViewTableCell } from "./cell";
import { ViewTableRow, ViewTableRowAdd } from "./row";

export interface IViewTableCellAdd extends IViewTableCell {
    /**
     * Текст
     */
    label: JQuery<HTMLElement>;

    /**
     * Кнопка "Добавить новую задачу"
     */
    img_add: JQuery<HTMLElement>;
}

export class ViewTableCellAdd extends ViewTableCell implements IViewTableCellAdd {
    object: JQuery<HTMLElement>;
    row: ViewTableRow | ViewTableRowAdd;
    label: JQuery<HTMLElement>;
    img_add: JQuery<HTMLElement>;

    constructor(row: ViewTableRowAdd, text: string = "") {
        super(row);
        this.object.addClass("task-table-cell_add");
        // this.object.addClass("task-table-cell_deadline");

        this.img_add = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_new",
            src: "/frontend/html/img/plus.svg"
        }).appendTo(this.object);

        this.label = $("<p>", {
            class: "task-table-cell__label",
            html: text
        }).appendTo(this.object);
    }

}