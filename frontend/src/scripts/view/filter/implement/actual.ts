import { ViewFilter } from "./filter";
import { ViewFilterOptionCheckbox } from "./option_checkbox";

export class ViewFilterActual extends ViewFilterOptionCheckbox {
    constructor(container: ViewFilter, change_callback: (is_checked: boolean) => Promise<boolean>) {
        super(container, "Только актуальные задачи:", [{
            text: "Да",
            onChange: change_callback
        }]);
    }
}