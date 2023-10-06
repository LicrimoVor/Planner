import { IViewFilterOptionSelect, IViewFilterSelectItemConfig } from "../interface/option_select";
import { ViewFilter } from "./filter";
import { ViewFilterOption } from "./option";

export class ViewFilterOptionSelect extends ViewFilterOption implements IViewFilterOptionSelect {
    select: JQuery<HTMLElement>;
    items: JQuery<HTMLElement>[] = [];
    
    constructor(container: ViewFilter, title_text: string, data: IViewFilterSelectItemConfig[]) {
        super(container, title_text);

        this.select = $("<select>", {
            class: "task-filter-select"
        }).appendTo(this.object);

        for(const item of data) {
            const option = $("<option>", {
                class: "task-filter-select__option",
                html: item.text
            }).appendTo(this.select).prop("selected", item.is_default ? true : false);
            this.select.on("change", () => {
                if(this.select.val() === item.text)
                    item.onSelect();
            })
            this.items.push(option);
        }
    }
}