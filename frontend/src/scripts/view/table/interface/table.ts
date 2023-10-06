import { IStatusModel } from "../../../../api/status/interface/model";
import { ITagModel } from "../../../../api/tag/interface/model";
import { ViewTableAdd } from "../implement/add";
import { ViewTable } from "../implement/table";
import { ViewTableTask } from "../implement/task";

export interface IViewTable {
    /**
     * Объект таблицы
     */
    object: JQuery<HTMLElement>;

    /**
     * Массив с задачами
     */
    tasks: ViewTableTask[];

    /**
     * Список статусов
     */
    status_list: IStatusModel[];

    /**
     * Список тегов
     */
    tags_list: ITagModel[];

    /**
     * Является ли персональной таблицей
     */
    is_personal: boolean;

    /**
     * Строка для добавления новой задачи
     */
    add: ViewTableAdd;

    /**
     * Очищает все задачи в таблице
     */
    clear(): ViewTable;

    /**
     * Callback создания новой задачи
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onAdd: () => Promise<boolean>;
}

export interface IViewTableConfig {
    /**
     * Заголовки таблицы
     */
    header: string[][];
    
    /**
     * Является это персональной таблицей
     */
    is_personal: boolean;

    /**
     * Список статусов
     */
    status_list: IStatusModel[];

    /**
     * Список тегов
     */
    tags_list: ITagModel[];

    /**
     * Callback создания новой задачи
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onAdd: () => Promise<boolean>;
}