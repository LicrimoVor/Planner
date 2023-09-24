import { ViewTable } from "../table";
import { ViewTableCellDeadline } from "./deadline";
import { ViewTableCellDescription } from "./description";
import { ViewTableCellName } from "./name";
import { ViewTableCellStatus } from "./status";
import { ViewTableCellTags } from "./tags";

export interface IViewTableRow {
    /**
     * Объект строки
     */
    object: JQuery<HTMLElement>;

    /**
     * Родительская таблица
     */
    table: ViewTable;

    /**
     * Родительская строка (для подзадач)
     */
    parent: ViewTableRow;

    /**
     * Глубина уровня
     */
    depth: number;

    /**
     * Ячейка с именем задачи
     */
    name: ViewTableCellName;

    /**
     * Ячейка со статусом
     */
    status: ViewTableCellStatus;

    /**
     * Ячейка с тегами
     */
    tags: ViewTableCellTags;

    /**
     * Ячейка с дедлайном
     */
    deadline: ViewTableCellDeadline;

    /**
     * Ячейка с описанием
     */
    description: ViewTableCellDescription;

    /**
     * Удалить строку
     */
    destroy(): void;
}

export class ViewTableRow implements IViewTableRow {
    object: JQuery<HTMLElement>;
    table: ViewTable;
    parent: ViewTableRow;
    depth: number;
    name: ViewTableCellName;
    status: ViewTableCellStatus;
    tags: ViewTableCellTags;
    deadline: ViewTableCellDeadline;
    description: ViewTableCellDescription;

    constructor(table: ViewTable, parent?: ViewTableRow) {
        this.table = table;
        this.parent = parent;

        this.object = $("<tr>", {
            class: "task-table-row"
        });

        if(parent) this.object.insertAfter(this.parent.object);
        else this.object.appendTo(this.table.object);

        table.rows.push(this);
    }

    destroy(): void {
        for(const children of this.table.rows.filter(obj => obj.parent == this)) {
            children.destroy();
        }
        this.table.rows = this.table.rows.filter(obj => obj != this);
        this.object.remove();
    }
}