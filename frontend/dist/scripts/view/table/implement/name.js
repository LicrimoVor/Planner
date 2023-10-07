import { ViewTableTaskCell } from "./task_cell.js";
export class ViewTableName extends ViewTableTaskCell {
    constructor(row) {
        super(row, "name");
        // Переместить
        this.img_move = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_drag",
            src: "/frontend/html/img/drag.svg"
        }).appendTo(this.object);
        let old_y;
        this.img_move.on("mousedown", (e) => {
            if (e.button == 2)
                return;
            this.row.is_hovered = true;
            old_y = e.pageY;
            this.row.object.css({ left: `${this.row.object.offset().left}px`, top: `${this.row.object.offset().top}px` });
            this.row.object.toggleClass("task-table-row_active", this.row.is_hovered);
        });
        $(document.body).on("mouseup", () => {
            if (!this.row.is_hovered)
                return;
            this.row.is_hovered = false;
            this.row.object.css({ left: "0", top: "0" });
            this.row.object.toggleClass("task-table-row_active", this.row.is_hovered);
            let hovered = $(".task-table-row_hovered");
            hovered.toggleClass("task-table-row_hovered", false);
            if (hovered[0] == this.row.table.add.object[0]) {
                this.row.onAttach();
                return;
            }
            for (const task of this.row.table.tasks) {
                if (hovered[0] == task.object[0]) {
                    this.row.onAttach(task);
                    break;
                }
            }
        });
        $(document.body).on("mousemove", (e) => {
            if (!this.row.is_hovered)
                return;
            let top = this.row.object.offset().top;
            let height = this.row.object.innerHeight();
            if (top < this.row.table.add.object.offset().top) {
                this.row.object.css({ top: `${this.row.table.add.object.offset().top}px` });
                return;
            }
            else if (top > this.row.table.object.offset().top + this.row.table.object.innerHeight()) {
                this.row.object.css({ top: `${this.row.table.object.offset().top + this.row.table.object.innerHeight()}px` });
                return;
            }
            top += e.pageY - old_y;
            this.row.object.css({ top: `${top}px` });
            old_y = e.pageY;
            let offset = 8;
            for (const row of this.row.table.tasks) {
                if (row == this.row || row.parent == this.row || row.depth == 4)
                    continue;
                if (row.object.offset().top + row.object.innerHeight() - offset <= top && top <= row.object.offset().top + row.object.innerHeight() + offset) {
                    row.object.toggleClass("task-table-row_hovered", true);
                }
                else {
                    row.object.toggleClass("task-table-row_hovered", false);
                }
                if (this.row.table.add.object.offset().top + this.row.table.add.object.innerHeight() - offset <= top && top <= this.row.table.add.object.offset().top + this.row.table.add.object.innerHeight() + offset) {
                    this.row.table.add.object.toggleClass("task-table-row_hovered", true);
                }
                else {
                    this.row.table.add.object.toggleClass("task-table-row_hovered", false);
                }
            }
        });
        // Раскрыть/скрыть
        this.img_expand = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_expand",
            src: "/frontend/html/img/drop_down.svg"
        }).appendTo(this.object);
        this.img_expand.on("click", async () => {
            this.row.expand(false);
        });
        // Добавить
        this.img_add = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_new",
            src: "/frontend/html/img/plus.svg"
        }).appendTo(this.object);
        this.img_add.on("click", async () => {
            if (!await this.row.onAddSubtask())
                return;
        });
        // Поле ввода
        this.input = $("<input>", {
            type: "text",
            class: "task-table-cell__input",
            value: this.row.data.name
        }).appendTo(this.object);
        this.input.on("mousedown", (e) => {
            if (e.button == 2)
                e.preventDefault();
        });
        // Событие изменения текста в поле для названия
        this.input.on("change", async () => {
            if (this.row.data.name == this.input.val() ||
                !await this.row.onNameChange(this.input.val()))
                return;
            this.row.data.name = this.input.val();
        });
        // Бинды
        this.input.on("keydown", (e) => {
            if (e.key == "Enter") {
                this.blur();
            }
            else if (e.key == "Escape") {
                this.input.val(this.row.data.name);
                this.blur();
            }
        });
        for (let i = 0; i < this.row.depth; i++) {
            this.addLevel();
        }
    }
    getLevel() {
        return this.object.children(".task-table-cell__level").length;
    }
    addLevel() {
        $("<div>", {
            class: "task-table-cell__level"
        }).prependTo(this.object);
        return this;
    }
    removeLevel() {
        this.object.children(".task-table-cell__level").remove();
        return this;
    }
    focus() {
        this.input.trigger("focus");
        this.input.val("");
        this.input.val(this.row.data.name);
        return this;
    }
    blur() {
        this.input.trigger("blur");
        return this;
    }
}
