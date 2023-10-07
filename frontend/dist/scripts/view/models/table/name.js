import { ViewTableCell } from "./cell.js";
export class ViewTableCellName extends ViewTableCell {
    constructor(row, name = "") {
        super(row);
        this.level_offset = [];
        this.object.addClass("task-table-cell_name");
        this.img_expand = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_expand",
            src: "/frontend/html/img/drop_down.svg"
        }).appendTo(this.object);
        this.img_add = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_new",
            src: "/frontend/html/img/plus.svg"
        }).appendTo(this.object);
        this.label = $("<p>", {
            class: "task-table-cell__label",
            html: name
        }).appendTo(this.object);
        this.input = $("<input>", {
            class: "task-table-cell__input",
            value: this.label.text(),
            css: { display: "none" }
        }).on("keydown", function (e) {
            if (e.key == "Enter" || e.key == "Escape") {
                $(this).trigger("blur");
            }
        });
        this.object.append(this.input);
        this.label.on("click", () => {
            // console.log(this.row.object[0]);
            this.openInput();
        });
        // this.img_edit = $("<img>", {
        //     class: "task-table-cell__img task-table-cell__img_edit",
        //     src: "/frontend/html/img/edit.svg"
        // }).appendTo(this.object);
    }
    setText(name = "") {
        this.label.html(name);
        return this;
    }
    setLevels(depth = 0) {
        while (this.level_offset.length != depth) {
            if (this.level_offset.length > depth)
                (this.level_offset.pop()).remove();
            else {
                this.level_offset.push(($("<div>", { class: "task-table-cell__level" })));
                this.object.prepend(this.level_offset[this.level_offset.length - 1]);
            }
        }
        return this;
    }
    onExpand(callback, ...args) {
        this.img_expand.on("click", async () => {
            if (!await callback(...args))
                return;
            this.is_expanded = !this.is_expanded;
            this.img_expand.toggleClass("task-table-cell__img_expand_open", this.is_expanded);
        });
        this.expand = async (is_phantom) => {
            if (!is_phantom && !await callback(...args))
                return false;
            this.is_expanded = !this.is_expanded;
            this.img_expand.toggleClass("task-table-cell__img_expand_open", this.is_expanded);
            return true;
        };
        return this;
    }
    openInput() {
        if (this.input.css("display") == "block")
            return this;
        this.input.css("display", "block");
        this.input.trigger("focus");
        this.input.val("");
        this.input.val(this.label.text());
        return this;
    }
    destroyInput() {
        if (this.input.css("display") == "none")
            return this;
        this.input.css("display", "none");
        return this;
    }
    onEnter(callback, ...args) {
        this.input.on("blur", async () => {
            if (this.input.val() == this.label.text())
                return this.destroyInput();
            if (!await callback(...args))
                return;
            this.label.html(this.input.val());
            this.destroyInput();
        });
        return this;
    }
}
