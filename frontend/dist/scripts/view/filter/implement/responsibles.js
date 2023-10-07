import { ViewFilterOptionCheckbox } from "./option_checkbox.js";
export class ViewFilterResponsibles extends ViewFilterOptionCheckbox {
    constructor(container, data) {
        super(container, "Ответственные:", data);
    }
}
