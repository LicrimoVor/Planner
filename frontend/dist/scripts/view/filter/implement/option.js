export class ViewFilterOption {
    constructor(container, title_text) {
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
