import { ViewTable } from "../implement/table";

export interface IViewTableRow {
    /**
     * Объект строки
     */
    object: JQuery<HTMLElement>;

    /**
     * Родительская таблица
     */
    table: ViewTable;
}