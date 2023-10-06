import { ViewTableAdd } from "../implement/add";
import { ViewTableHeader } from "../implement/header";
import { ViewTableRow } from "../implement/row";
import { ViewTableTask } from "../implement/task";

export interface IViewTableCell {
    /**
     * Объект ячейки
     */
    object: JQuery<HTMLElement>;

    /**
     * Родительская строка
     */
    row: ViewTableRow | ViewTableHeader | ViewTableAdd | ViewTableTask;

    /**
     * Ключевое имя ячейки
     */
    key_name: string;
}