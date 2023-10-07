import { CONTEXT_MENU_TYPE } from "../../../context/interface/menu.js";
import { ContextMenu } from "../../../context/menu.js";
import { ViewTableDeadline } from "./deadline.js";
import { ViewTableDescription } from "./description.js";
import { ViewTableName } from "./name.js";
import { ViewTableResponsible } from "./responsible.js";
import { ViewTableRow } from "./row.js";
import { ViewTableStatus } from "./status.js";
import { ViewTableTags } from "./tags.js";
export class ViewTableTask extends ViewTableRow {
    constructor(table, config) {
        super(table);
        this.is_expanded = false;
        this.is_hovered = false;
        // Инициализация данных
        if (this.table.is_personal)
            this.data = config.data;
        else
            this.data = config.data;
        this.depth = config.depth;
        this.parent = config.parent;
        this.onNameChange = config.onNameChange;
        this.onExpand = config.onExpand;
        this.onAddSubtask = config.onAddSubtask;
        this.onStatusChange = config.onStatusChange;
        this.onTagAdd = config.onTagAdd;
        this.onTagRemove = config.onTagRemove;
        this.onResponsibleAdd = config.onResponsibleAdd;
        this.onResponsibleRemove = config.onResponsibleRemove;
        this.onDeadlineChange = config.onDeadlineChange;
        this.onDescriptionChange = config.onDescriptionChange;
        this.onRemove = config.onRemove;
        if (this.parent)
            this.object.insertAfter(this.parent.object);
        else
            this.object.insertAfter(this.table.add.object);
        this.object.on("contextmenu", (e) => {
            e.preventDefault();
            new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.DEFAULT, [
                { text: "Действия:" },
                { text: "<span style='color: rgb(175, 52, 52);'>Удалить</span>", is_active: true, callback: this.onRemove }
            ]);
        });
        // Заполнение строки
        this.name = new ViewTableName(this);
        this.status = new ViewTableStatus(this);
        this.tags = new ViewTableTags(this);
        if (!this.table.is_personal)
            this.responsible = new ViewTableResponsible(this);
        this.deadline = new ViewTableDeadline(this);
        this.description = new ViewTableDescription(this);
        this.table.tasks.push(this);
    }
    setLevel(depth) {
        this.depth = depth;
        while (this.name.getLevel() != this.depth) {
            if (this.name.getLevel() < this.depth)
                this.name.addLevel();
            else
                this.name.removeLevel();
        }
        return this;
    }
    destroy() {
        if (this.data.subtasks && this.data.subtasks.length) {
            for (const task of this.table.tasks) {
                if (this.data.subtasks.map(obj => obj.id).indexOf(task.data.id) != -1) {
                    task.destroy();
                }
            }
        }
        this.table.tasks = this.table.tasks.filter(obj => obj != this);
        this.object.remove();
    }
    async expand(is_phantom) {
        if (!is_phantom && !await this.onExpand())
            return;
        this.is_expanded = !this.is_expanded;
        this.name.img_expand.toggleClass("task-table-cell__img_expand_open", this.is_expanded);
    }
}
