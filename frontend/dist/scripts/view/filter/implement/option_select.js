import { ViewFilterOption } from "./option.js";
export class ViewFilterOptionSelect extends ViewFilterOption {
    constructor(container, title_text, data) {
        super(container, title_text);
        this.items = [];
        this.select = $("<select>", {
            class: "task-filter-select"
        }).appendTo(this.object);
        for (const item of data) {
            const option = $("<option>", {
                class: "task-filter-select__option",
                html: item.text
            }).appendTo(this.select).prop("selected", item.is_default ? true : false);
            this.select.on("change", () => {
                if (this.select.val() === item.text)
                    item.onSelect();
            });
            this.items.push(option);
        }
    }
}
