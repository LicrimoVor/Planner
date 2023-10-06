import { ViewTableName } from "../implement/name";
import { IViewTableCell } from "./cell";

export interface IViewTableName extends IViewTableCell {
    /**
     * Поле ввода названия
     */
    input: JQuery<HTMLElement>;

    /**
     * Кнопка "Перенос строки"
     */
    img_move: JQuery<HTMLElement>;

    /**
     * Кнопка "Раскрыть задачу"
     */
    img_expand: JQuery<HTMLElement>;

    /**
     * Кнопка "Добавить подзадачу"
     */
    img_add: JQuery<HTMLElement>;

    /**
     * Возвращает количество отступов
     */
    getLevel(): number;

    /**
     * Добавляет новый отступ
     */
    addLevel(): ViewTableName;

    /**
     * Убирает отступ
     */
    removeLevel(): ViewTableName;

    /**
     * Фокусирует поле ввода названия
     */
    focus(): ViewTableName;

    /**
     * Убирает фокус поля ввода названия
     */
    blur(): ViewTableName;
}