import { ViewFilterOptionCheckbox } from "./option_checkbox.js";
export class ViewFilterStatus extends ViewFilterOptionCheckbox {
    constructor(container, data) {
        super(container, "Выбранный статус:", data);
    }
}
