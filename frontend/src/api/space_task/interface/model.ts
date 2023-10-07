import { IObjectListModel } from "../../list/interface";
import { ISpaceModel } from "../../space/interface/model";
import { ITaskModel } from "../../task/interface";
import { IUserModel } from "../../user/interface/model";

export interface ISpaceTaskModel extends ITaskModel {
    /**
     * Автор задачи
     */
    author?: IUserModel;

    /**
     * Пространство, которому принадлежит задача
     */
    space?: ISpaceModel;

    /**
     * Список ответственных пользователей за эту задачу
     */
    responsibles?: IUserModel[];
}

export const SpaceTaskModelDefault: ISpaceTaskModel = {
    name: "Новая задача",
    description: "",
    subtasks: [],
    tags: [],
    responsibles: []
}

export type ISpaceTaskListModel = IObjectListModel & {
    results: Array<ISpaceTaskModel>;
}