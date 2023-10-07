import { ViewTableCellAdd } from "./add.js";
export class ViewTableRow {
    constructor(table, id, parent, add_row) {
        this.table = table;
        this.parent = parent;
        this.id = id;
        this.object = $("<tr>", {
            class: "task-table-row",
            css: { display: "none" }
        });
        if (parent)
            this.object.insertAfter(this.parent.object);
        else if (add_row)
            this.object.insertAfter(add_row.object);
        else
            this.object.appendTo(this.table.object);
        table.rows.push(this);
        if (this.init)
            this.init();
        let old_x, old_y;
        this.object.on("mousedown", (e) => {
            if (e.button == 2)
                return;
            if (this.hover_timer)
                clearTimeout(this.hover_timer);
            this.hover_timer = setTimeout(() => {
                this.is_hovered = true;
                old_x = e.pageX, old_y = e.pageY;
                this.object.css({ left: `${this.object.offset().left}px`, top: `${this.object.offset().top}px` });
                this.object.trigger("mousemove", e);
                this.object.toggleClass("task-table-row_active", this.is_hovered);
            }, 750);
        });
        $(document.body).on("mouseup", async (e) => {
            if (this.hover_timer)
                clearTimeout(this.hover_timer);
            if (this.is_hovered) {
                this.is_hovered = false;
                this.object.css({ left: "0", top: "0" });
                this.object.toggleClass("task-table-row_active", this.is_hovered);
                let rows = this.table.rows.slice();
                rows.push(this.table.add);
                let hovered = $(".task-table-row_hovered");
                hovered.toggleClass("task-table-row_hovered", false);
                for (const row of rows) {
                    if (hovered[0] == this.table.add.object[0]) {
                        await this.onAttach(0);
                        break;
                    }
                    if (hovered[0] == row.object[0]) {
                        await this.onAttach(row.id);
                        break;
                    }
                }
            }
        });
        $(document.body).on("mousemove", (e) => {
            if (!this.is_hovered)
                return;
            let left = this.object.offset().left, top = this.object.offset().top;
            let width = this.object.innerWidth(), height = this.object.innerHeight();
            this.object.css({ left: `${left + (e.pageX - old_x)}px`, top: `${top + (e.pageY - old_y)}px` });
            old_x = e.pageX, old_y = e.pageY;
            let offset = 8;
            // Проверка на то, что курсор находится в границах таблицы
            if (!(e.pageX >= this.table.object.offset().left
                && e.pageX <= this.table.object.offset().left + this.table.object.innerWidth())) {
                $(".task-table-row_hovered").toggleClass("task-table-row_hovered", false);
                return;
            }
            let rows = this.table.rows.slice();
            rows.push(this.table.add);
            for (const row of rows) {
                if (row == this || row.parent == this || row.depth == 4)
                    continue;
                if (row.object.offset().top + row.object.innerHeight() - offset <= e.pageY && e.pageY <= row.object.offset().top + row.object.innerHeight() + offset) {
                    row.object.toggleClass("task-table-row_hovered", true);
                }
                else {
                    row.object.toggleClass("task-table-row_hovered", false);
                }
            }
        });
    }
    destroy() {
        for (const children of this.table.rows.filter(obj => obj.parent == this)) {
            children.destroy();
        }
        this.table.rows = this.table.rows.filter(obj => obj != this);
        this.object.slideUp(250, () => this.object.remove());
    }
    onAdd(callback, ...args) {
        this.name.img_add.on("click", async () => {
            if (!await callback(...args))
                return;
        });
        return this;
    }
}
export class ViewTableRowAdd {
    constructor(table, text = "") {
        this.table = table;
        this.object = $("<tr>", {
            class: "task-table-row"
        }).appendTo(this.table.object);
        this.cell = new ViewTableCellAdd(this, text);
        if (this.init)
            this.init();
    }
    destroy() {
        this.object.remove();
    }
    onAdd(callback, ...args) {
        this.cell.object.on("click", async () => {
            if (!await callback(...args))
                return;
        });
        return this;
    }
}
