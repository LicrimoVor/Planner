import { IViewFilterCheckboxConfig } from "../interface/checkbox";
import { ViewFilter } from "./filter";
import { ViewFilterOptionCheckbox } from "./option_checkbox";

export class ViewFilterResponsibles extends ViewFilterOptionCheckbox {
    constructor(container: ViewFilter, data: IViewFilterCheckboxConfig[]) {
        super(container, "Ответственные:", data);
    }
}