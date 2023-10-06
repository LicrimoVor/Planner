import { ITagModel } from "../../../../api/tag/interface/model";
import { ViewTableTags } from "../implement/tags";
import { ViewTableTrait } from "../implement/trait";
import { IViewTableCell } from "./cell";

export interface IViewTableTags extends IViewTableCell {
    /**
     * Кнопка "Добавить тег"
     */
    img_add: JQuery<HTMLElement>;

    addTrait(data: ITagModel): ViewTableTags;
}