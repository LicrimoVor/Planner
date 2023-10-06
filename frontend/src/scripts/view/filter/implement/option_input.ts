import { IViewFilterOptionInput } from "../interface/option_input";
import { ViewFilter } from "./filter";
import { ViewFilterOption } from "./option";

export class ViewFilterOptionInput extends ViewFilterOption implements IViewFilterOptionInput {
    input: JQuery<HTMLElement>;

    constructor(container: ViewFilter, title_text: string, placeholder_text: string, change_callback: (value: string) => Promise<boolean>) {
        super(container, title_text);
        
        this.input = $("<input>", {
            class: "task-filter-option__input",
            placeholder: placeholder_text
        }).appendTo(this.object);

        this.input.on("input", () => {
            change_callback(this.input.val() as string);
        });
    }
}