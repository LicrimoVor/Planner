import { ViewTableRow } from "./row";

/**
 * Модель ячейки таблицы
 */
export interface IViewTableCell {
    /**
     * Объект ячейки
     */
    object: JQuery<HTMLElement>;

    /**
     * Родительская строка
     */
    row: ViewTableRow;
}

export class ViewTableCell implements IViewTableCell {
    object: JQuery<HTMLElement>;
    row: ViewTableRow;

    constructor(row: ViewTableRow) {
        this.row = row;

        this.object = $("<td>", {
            class: "task-table-cell"
        }).appendTo(this.row.object);
    }
}