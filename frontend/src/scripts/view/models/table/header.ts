import { ViewTable } from "../table";
import { IViewTableCell } from "./cell";
import { ViewTableRow } from "./row";

export interface IViewTableRowHeader {
    /**
     * Родительская таблица
     */
    table: ViewTable;

    /**
     * Объект хейдера
     */
    object: JQuery<HTMLElement>;

    /**
     * Массив ячеек хейдера
     */
    cells: ViewTableCellHeader[];
}

export interface IViewTableCellHeader extends IViewTableCell {
    /**
     * Заголовочный текст
     */
    label: JQuery<HTMLElement>;

    /**
     * Ползунок изменения ширины столбца
     */
    resize: JQuery<HTMLElement>;
}

export class ViewTableRowHeader implements IViewTableRowHeader {
    table: ViewTable;
    object: JQuery<HTMLElement>;
    cells: ViewTableCellHeader[] = [];

    constructor(table: ViewTable) {
        this.table = table;

        this.object = $("<tr>", {
            class: "task-table-row task-table-row_header"
        }).appendTo(this.table.object);
    }
}

export class ViewTableCellHeader implements IViewTableCellHeader {
    object: JQuery<HTMLElement>;
    row: ViewTableRow;
    label: JQuery<HTMLElement>;
    resize: JQuery<HTMLElement>;

    constructor(row: ViewTableRowHeader, name: string, text: string) {
        this.object = $("<td>", {
            class: `task-table-cell task-table-cell_${name}`
        }).appendTo(row.object);
        this.object.attr("data-name", name);

        this.label = $("<p>", {
            class: "task-table-cell__label",
            html: text
        }).appendTo(this.object);

        this.resize = $("<div>", {
            class: "task-table-cell__resize"
        }).appendTo(this.object);

        row.cells.push(this);

        let is_mouse_hold: boolean = false;
        let changing_column: JQuery<HTMLElement>;
        let old_x: number = 0;

        this.resize.on("mousedown", function (e) {
            is_mouse_hold = true;
            old_x = e.clientX;
            changing_column = $(e.currentTarget.parentElement);
            changing_column.on("mouseleave", () => {
                is_mouse_hold = false;
                changing_column = undefined;
            })
        });

        $(document).on("mouseup", function () {
            if(is_mouse_hold) is_mouse_hold = false, changing_column = undefined;
        });

    
        $(document).on("mousemove", (e) => {
            if(!is_mouse_hold) return;
            let left = changing_column.offset().left;
            let width = changing_column.innerWidth();
            let offset = 2; // Смещение вправую сторону, чтобы курсор не оказался за границей столбца.
            // let new_width = Math.max(left - e.pageX, e.pageX - left) + (left + changing_column.innerWidth() - e.pageX);
            // console.log(old_x, e.pageX);
            // let new_width = (e.pageX - left) + (width - ((this.resize.offset().left - left) + e.pageX - this.resize.offset().left));
            // let new_width = (e.pageX - left) + (width - (this.resize.offset().left - left));
            let new_width = width + (e.pageX - this.resize.offset().left - this.resize.width() / 2);
            old_x = e.clientX;
            
            // new_width = (e.pageX )
            // console.log(new_width, Math.floor(e.pageX - old_x));
            // old_x = e.pageX;
            $(":root").css(`--table-cell-${changing_column.data("name")}`, `${new_width}px`);
            

    
            // Проверка на границу
            // if(e.pageX > left + changing_column.width()) {
            //     if(row.object.offset().left + row.object.width() >= 
            //         row.table.object.offset().left + row.table.object.width())
            //         return;
            // }
            // console.log("table: ", row.table.object.offset().left + row.table.object.width());
            // console.log("element: ", changing_column.offset().left);
            // console.log("width", );
            // if(left + new_width > row.table.object.offset().left + row.table.object.width())
            //     return;
            // else if(e.pageX > left + changing_column.innerWidth()) return;
            // else if(e.pageX > left + changing_column.width()) {
            //     if(changing_column.offset().left + changing_column.innerWidth() >=
            //         row.table.object.offset().left + row.table.object.width())
            //             return;
            // }
            
        });
    }
}