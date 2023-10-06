import { IObjectListModel } from "../../list/interface";
import { IStatusModel } from "../../status/interface/model";
import { ITagModel } from "../../tag/interface/model";
import { ITaskModel } from "../../task/interface";
import { IUserModel } from "../../user/interface/model";

export interface IPersonalTaskModel extends ITaskModel {

}

export const PersonalTaskModelDefault: IPersonalTaskModel = {
    name: "Новая задача",
    description: "",
    subtasks: [],
    tags: []
}

export type IPersonalTaskListModel = IObjectListModel & {
    results: Array<IPersonalTaskModel>;
}