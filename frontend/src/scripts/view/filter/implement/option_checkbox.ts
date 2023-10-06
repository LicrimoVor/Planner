
import { IViewFilterCheckboxConfig } from "../interface/checkbox";
import { IViewFilterOptionCheckbox } from "../interface/option_checkbox";
import { ViewFilterCheckbox } from "./checkbox";
import { ViewFilter } from "./filter";
import { ViewFilterOption } from "./option";

export class ViewFilterOptionCheckbox extends ViewFilterOption implements IViewFilterOptionCheckbox {
    checkbox_list: ViewFilterCheckbox[] = [];

    constructor(container: ViewFilter, title_text: string, data: IViewFilterCheckboxConfig[]) {
        super(container, title_text);

        for(const item of data) {
            new ViewFilterCheckbox(this, item);
        }
    }
}