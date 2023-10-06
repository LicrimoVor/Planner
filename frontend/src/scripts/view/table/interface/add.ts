import { ViewTableAddCell } from "../implement/add_cell";
import { IViewTableRow } from "./row";

export interface IViewTableAdd extends IViewTableRow {
    /**
     * Ячейка строки для создания задачи
     */
    cell: ViewTableAddCell;
}