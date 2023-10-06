import { IObjectListModel } from "../../list/interface";
import { ITraitModel } from "../../trait/interface";

/**
 * Модель статуса
 */
export interface IStatusModel extends ITraitModel {

}

export type IStatusListModel = IObjectListModel & {
    results: Array<IStatusModel>;
}