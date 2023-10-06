import { IUserModel } from "../../../../api/user/interface/model";
import { ViewTableTags } from "../implement/tags";
import { IViewTableCell } from "./cell";

export interface IViewTableResponsible extends IViewTableCell {
    /**
     * Кнопка "Добавить ответственного"
     */
    img_add: JQuery<HTMLElement>;

    addTrait(data: IUserModel): ViewTableTags;
}