import { IViewFilterCheckbox, IViewFilterCheckboxConfig } from "../interface/checkbox";
import { ViewFilterOptionCheckbox } from "./option_checkbox";

export class ViewFilterCheckbox implements IViewFilterCheckbox {
    object: JQuery<HTMLElement>;
    option: ViewFilterOptionCheckbox;
    checkbox: JQuery<HTMLElement>;
    label: JQuery<HTMLElement>;

    constructor(option: ViewFilterOptionCheckbox, data: IViewFilterCheckboxConfig) {
        this.option = option;

        this.object = $("<div>", {
            class: "task-filter-checkbox"
        }).appendTo(this.option.object);

        this.label = $("<label>", {
            class: "task-filter-checkbox__label",
            html: data.text
        }).appendTo(this.object);

        this.checkbox = $("<input>", {
            class: "task-filter-checkbox__input",
            type: "checkbox"
        }).prependTo(this.label).prop("checked", data.is_active ? true : false)
        .on("change", () => {
            data.onChange(this.checkbox.prop("checked"));
        });

        this.option.checkbox_list.push(this);
    }
}