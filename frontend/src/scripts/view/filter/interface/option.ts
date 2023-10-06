import { ViewFilter } from "../implement/filter";

export interface IViewFilterOption {
    /**
     * Объект параметра фильтрации
     */
    object: JQuery<HTMLElement>;

    /**
     * Меню фильтров
     */
    container: ViewFilter;

    /**
     * Заголовок параметра
     */
    title: JQuery<HTMLElement>;
}