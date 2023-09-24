import { IObjectListModel } from "../../list/interface";
import { IStatusModel } from "../../status/interface/model";
import { ITagModel } from "../../tag/interface/model";
import { IUserModel } from "../../user/interface/model";

export interface IPersonalTaskModel {
    discription: string;
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

export type IPersonalTaskListModel = IObjectListModel & {
    results: Array<IPersonalTaskModel>;
}