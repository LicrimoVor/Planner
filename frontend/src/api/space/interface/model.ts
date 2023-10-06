import { IUserModel } from "../../user/interface/model";

export interface ISpaceModel {
    /**
     * Идентификатор пространства
     */
    id: number;

    /**
     * Название пространства
     */
    name: string;

    /**
     * Администратор пространства
     */
    admin: IUserModel;

    /**
     * Сотрудники пространства
     */
    staff: IUserModel[];
}