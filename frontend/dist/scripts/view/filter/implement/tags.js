import { ViewFilterOptionCheckbox } from "./option_checkbox.js";
export class ViewFilterTags extends ViewFilterOptionCheckbox {
    constructor(container, data) {
        super(container, "Теги:", data);
    }
}
