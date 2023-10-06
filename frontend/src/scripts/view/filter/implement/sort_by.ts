import { IViewFilterSelectItemConfig } from "../interface/option_select";
import { ViewFilter } from "./filter";
import { ViewFilterOptionSelect } from "./option_select";

export class ViewFilterSortBy extends ViewFilterOptionSelect {
    constructor(container: ViewFilter, data: IViewFilterSelectItemConfig[]) {
        super(container, "Сортировать по:", data);
    }
}