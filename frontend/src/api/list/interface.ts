import { IPersonalTaskModel } from "../personal_task/interface/model";
import { IStatusModel } from "../status/interface/model";
import { ITagModel } from "../tag/interface/model";
import { IUserModel } from "../user/interface/model";

/**
 * Модель возвращаемоего списка объектов.
 */
export interface IObjectListModel {

    /**
     * Количество строк
     */
    count: number;

    /**
     * URL ссылка на следующую страницу списка
     */
    next: string;

    /**
     * URL ссылка на предыдущую страницу списка
     */
    previous: string;

    /**
     * Массив объектов
     */
    // results: any;
}