import { ViewTableDescription } from "../implement/description";
import { IViewTableCell } from "./cell";

export interface IViewTableDescription extends IViewTableCell {
    /**
     * Поле ввода описания
     */
    input: JQuery<HTMLElement>;

    /**
     * Фокусирует поле ввода описания
     */
    focus(): ViewTableDescription;

    /**
     * Убирает фокус поля ввода описания
     */
    blur(): ViewTableDescription;
}