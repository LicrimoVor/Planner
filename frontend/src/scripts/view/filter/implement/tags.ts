import { IViewFilterCheckboxConfig } from "../interface/checkbox";
import { ViewFilter } from "./filter";
import { ViewFilterOptionCheckbox } from "./option_checkbox";

export class ViewFilterTags extends ViewFilterOptionCheckbox {
    constructor(container: ViewFilter, data: IViewFilterCheckboxConfig[]) {
        super(container, "Теги:", data);
    }
}