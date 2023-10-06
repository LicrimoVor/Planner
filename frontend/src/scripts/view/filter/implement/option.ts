import { IViewFilterOption } from "../interface/option";
import { ViewFilter } from "./filter";

export class ViewFilterOption implements IViewFilterOption {
    object: JQuery<HTMLElement>;
    container: ViewFilter;
    title: JQuery<HTMLElement>;

    constructor(container: ViewFilter, title_text: string) {
        this.container = container;

        this.object = $("<div>", {
            class: "task-filter-option"
        }).appendTo(this.container.object);

        this.title = $("<p>", {
            class: "task-filter-option__title",
            html: title_text
        }).appendTo(this.object);
    }
}