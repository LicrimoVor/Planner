import { ViewTableCell } from "./cell.js";
export class ViewTableCellTags extends ViewTableCell {
    constructor(row, array) {
        super(row);
        this.array = [];
        this.object.addClass("task-table-cell_tags");
        this.img_add = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_new",
            src: "/frontend/html/img/plus.svg"
        }).appendTo(this.object);
        if (array) {
            for (const tag of array) {
                this.add(tag);
            }
        }
    }
    add(data) {
        const tag_element = $("<p>", {
            class: "trait trait_tags",
            html: data.name,
            css: { "--trait-bg-color": data.color }
        });
        $("<img>", {
            class: "trait__remove",
            src: "/frontend/html/img/close.svg"
        }).appendTo(tag_element).on("click", () => {
            this.remove(tag_element);
        });
        tag_element.insertBefore(this.img_add);
        tag_element.data("tagId", data.id);
        this.array.push(tag_element);
        return this;
    }
    remove(tag_element) {
        this.array = this.array.filter(obj => obj != tag_element);
        tag_element.remove();
        this.onRemove(this.array.map(obj => obj.data("tagId")));
        return this;
    }
}
