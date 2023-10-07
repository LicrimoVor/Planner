import { ViewFilterOptionSelect } from "./option_select.js";
export class ViewFilterSortBy extends ViewFilterOptionSelect {
    constructor(container, data) {
        super(container, "Сортировать по:", data);
    }
}
