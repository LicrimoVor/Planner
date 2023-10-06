import { IPersonalTaskModel } from "../personal_task/interface/model";
import { IStatusModel } from "../status/interface/model";
import { ITagModel } from "../tag/interface/model";

/**
 * Модель задачи (в целом)
 */
export interface ITaskModel {
    /**
     * Идентификатор
     */
    id?: number;

    /**
     * Название
     */
    name?: string;

    /**
     * Описание задачи
     */
    description?: string;

    /**
     * Статус
     */
    status?: IStatusModel;
    
    /**
     * Крайний срок
     */
    deadline?: number;

    /**
     * Список подзадач
     */
    subtasks?: Array<IPersonalTaskModel>;

    /**
     * Список тегов
     */
    tags?: Array<ITagModel>;
}