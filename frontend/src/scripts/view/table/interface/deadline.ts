import { ViewTableDeadline } from "../implement/deadline";
import { IViewTableCell } from "./cell";

export interface IViewTableDeadline extends IViewTableCell {
    /**
     * Текст даты
     */
    label: JQuery<HTMLElement>;

    /**
     * Кнопка "Изменить дедлайн"
     */
    input: JQuery<HTMLElement>;

    /**
     * Изменить дату дедлайна
     * @param new_deadline Новый timestamp дедлайна
     */
    setData(new_deadline: number): ViewTableDeadline;
}