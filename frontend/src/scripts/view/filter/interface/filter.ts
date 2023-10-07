import { ViewFilterActual } from "../implement/actual";
import { ViewFilterDescription } from "../implement/description";
import { ViewFilterName } from "../implement/name";
import { ViewFilterResponsibles } from "../implement/responsibles";
import { ViewFilterSortBy } from "../implement/sort_by";
import { ViewFilterStatus } from "../implement/status";
import { ViewFilterTags } from "../implement/tags";
import { IViewFilterCheckboxConfig } from "./checkbox";
import { IViewFilterSelectItemConfig } from "./option_select";

export interface IViewFilter {
    /**
     * Объект меню фильтров
     */
    object: JQuery<HTMLElement>;

    /**
     * Объект заголовка
     */
    title: JQuery<HTMLElement>;

    /**
     * Фильтр имени
     */
    name: ViewFilterName;

    /**
     * Фильтр описания
     */
    description: ViewFilterDescription;

    /**
     * Фильтр статуса
     */
    status: ViewFilterStatus;

    /**
     * Фильтр тегов
     */
    tags: ViewFilterTags;

    /**
     * Фильтр ответственных
     */
    responsibles: ViewFilterResponsibles;

    /**
     * Фильтр только актуальных задач
     */
    actual: ViewFilterActual;

    /**
     * Фильтр сортировки
     */
    sort_by: ViewFilterSortBy;
}

export interface IViewFilterConfig {
    /**
     * Callback изменения поля названия
     * @param value Значение поля названия
     * @returns 
     */
    onNameChange: (value: string) => Promise<boolean>;

    /**
     * Callback изменения поля описания
     * @param value Значение поля описания
     * @returns 
     */
    onDescriptionChange: (value: string) => Promise<boolean>;

    /**
     * Список статусов
     */
    status_list: IViewFilterCheckboxConfig[];

    /**
     * Список тегов
     */
    tags_list: IViewFilterCheckboxConfig[];

    /**
     * Список участников
     */
    staff_list: IViewFilterCheckboxConfig[];

    /**
     * Callback имзенения состояния чекбокса активных задач
     * @param is_checked Активен ли чекбокс
     * @returns 
     */
    onActualChange: (is_checked: boolean) => Promise<boolean>;

    /**
     * Список параметров для сортировки
     */
    sort_by_list: IViewFilterSelectItemConfig[];
}