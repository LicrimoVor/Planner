import { ViewFilterOptionCheckbox } from "./option_checkbox.js";
export class ViewFilterActual extends ViewFilterOptionCheckbox {
    constructor(container, change_callback) {
        super(container, "Только актуальные задачи:", [{
                text: "Да",
                onChange: change_callback
            }]);
    }
}
