import { IObjectListModel } from "../../list/interface";
import { ITraitModel } from "../../trait/interface";

/**
 * Модель тега
 */
export interface ITagModel extends ITraitModel {

}

export type ITagListModel = IObjectListModel & {
    results: Array<ITagModel>;
}