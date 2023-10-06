import { IViewFilterCheckboxConfig } from "../interface/checkbox";
import { ViewFilter } from "./filter";
import { ViewFilterOptionCheckbox } from "./option_checkbox";

export class ViewFilterStatus extends ViewFilterOptionCheckbox {
    constructor(container: ViewFilter, data: IViewFilterCheckboxConfig[]) {
        super(container, "Выбранный статус:", data);
    }
}