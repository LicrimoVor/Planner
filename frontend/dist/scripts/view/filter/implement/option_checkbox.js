import { ViewFilterCheckbox } from "./checkbox.js";
import { ViewFilterOption } from "./option.js";
export class ViewFilterOptionCheckbox extends ViewFilterOption {
    constructor(container, title_text, data) {
        super(container, title_text);
        this.checkbox_list = [];
        for (const item of data) {
            new ViewFilterCheckbox(this, item);
        }
    }
}
