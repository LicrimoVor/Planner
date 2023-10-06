import { IViewTableRowHeader, ViewTableCellHeader, ViewTableRowHeader } from "./table/header";
import { IViewTableRow, ViewTableRowAdd } from "./table/row";

export interface IViewTable {
    /**
     * Объект таблицы
     */
    object: JQuery<HTMLElement>;

    /**
     * Заголовочная строка
     */
    header: IViewTableRowHeader;

    /**
     * Строка создания новой задачи
     */
    add: ViewTableRowAdd;

    /**
     * Массив строк
     */
    rows: IViewTableRow[];

    /**
     * Удалить таблицу
     */
    destroy(): void;
}

export class ViewTable implements IViewTable {
    object: JQuery<HTMLElement>;
    header: IViewTableRowHeader;
    add: ViewTableRowAdd;
    rows: IViewTableRow[] = [];

    constructor(parent: JQuery<HTMLElement>, header_cells: [string, string][]) {
        this.object = $("<table>", {
            class: "task-table"
        }).appendTo(parent);

        // Создание хейдера
        this.header = new ViewTableRowHeader(this);
        for(const header_cell of header_cells) {
            new ViewTableCellHeader(this.header, ...header_cell);
        }
    }

    destroy(): void {
        this.object.remove();
    }
}