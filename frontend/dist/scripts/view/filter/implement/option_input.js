import { ViewFilterOption } from "./option.js";
export class ViewFilterOptionInput extends ViewFilterOption {
    constructor(container, title_text, placeholder_text, change_callback) {
        super(container, title_text);
        this.input = $("<input>", {
            class: "task-filter-option__input",
            placeholder: placeholder_text
        }).appendTo(this.object);
        this.input.on("input", () => {
            change_callback(this.input.val());
        });
    }
}
