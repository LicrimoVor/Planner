import { ViewTableHeader } from "../implement/header";
import { IViewTableCell } from "./cell";

export interface IViewTableHeaderCell extends IViewTableCell {
    /**
     * Объект заголовка
     */
    label: JQuery<HTMLElement>;

    /**
     * Объект ползунка изменения ширины столбца
     */
    resize: JQuery<HTMLElement>;
}