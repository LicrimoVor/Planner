import { ViewTableRow, ViewTableRowAdd } from "./row";

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
    row: ViewTableRow | ViewTableRowAdd;
}

export class ViewTableCell implements IViewTableCell {
    object: JQuery<HTMLElement>;
    row: ViewTableRow | ViewTableRowAdd;

    constructor(row: ViewTableRow | ViewTableRowAdd) {
        this.row = row;

        this.object = $("<td>", {
            class: "task-table-cell"
        }).appendTo(this.row.object);
    }
}