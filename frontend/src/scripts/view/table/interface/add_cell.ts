import { IViewTableCell } from "./cell";

export interface IViewTableAddCell extends IViewTableCell {
    /**
     * Объект заголовка
     */
    label: JQuery<HTMLElement>;

    /**
     * Кнопка "Добавить новую задачу"
     */
    img_add: JQuery<HTMLElement>;
}