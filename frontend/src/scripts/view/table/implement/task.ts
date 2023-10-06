import { IPersonalTaskModel } from "../../../../api/personal_task/interface/model";
import { ISpaceTaskModel } from "../../../../api/space_task/interface/model";
import { CONTEXT_MENU_TYPE } from "../../../context/interface/menu";
import { ContextMenu } from "../../../context/menu";
import { IViewTableTask, IViewTableTaskConfig } from "../interface/task";
import { ViewTableDeadline } from "./deadline";
import { ViewTableDescription } from "./description";
import { ViewTableName } from "./name";
import { ViewTableResponsible } from "./responsible";
import { ViewTableRow } from "./row";
import { ViewTableStatus } from "./status";
import { ViewTable } from "./table";
import { ViewTableTags } from "./tags";

export class ViewTableTask extends ViewTableRow implements IViewTableTask {
    data: (IPersonalTaskModel | ISpaceTaskModel);
    depth: number;
    parent: ViewTableTask;
    is_expanded: boolean = false;
    is_hovered: boolean = false;

    name?: ViewTableName;
    status?: ViewTableStatus;
    tags?: ViewTableTags;
    responsible?: ViewTableResponsible;
    deadline?: ViewTableDeadline;
    description?: ViewTableDescription;

    onNameChange: (value: string) => Promise<boolean>;
    onExpand: () => Promise<boolean>;
    onAddSubtask: () => Promise<boolean>;
    onStatusChange: (status_id: number) => Promise<boolean>;
    onTagAdd: (tags: number[]) => Promise<boolean>;
    onTagRemove: (tags: number[]) => Promise<boolean>;
    onResponsibleAdd: (tags: number[]) => Promise<boolean>;
    onResponsibleRemove: (tags: number[]) => Promise<boolean>;
    onDeadlineChange: (deadline: number) => Promise<boolean>;
    onDescriptionChange: (value: string) => Promise<boolean>;
    onAttach: (parent?: ViewTableTask) => Promise<boolean>;
    onRemove: () => Promise<boolean>;

    constructor(table: ViewTable, config: IViewTableTaskConfig) {
        super(table);

        // Инициализация данных
        if(this.table.is_personal)
            this.data = config.data as IPersonalTaskModel;
        else
            this.data = config.data as ISpaceTaskModel;
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

        if(this.parent)
            this.object.insertAfter(this.parent.object);
        else
            this.object.insertAfter(this.table.add.object);

        this.object.on("contextmenu", (e) => {
            e.preventDefault();

            new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.DEFAULT, [
                {text: "Действия:"},
                {text: "<span style='color: rgb(175, 52, 52);'>Удалить</span>", is_active: true, callback: this.onRemove}
            ]);
        });

        // Заполнение строки

        this.name = new ViewTableName(this);
        this.status = new ViewTableStatus(this)
        this.tags = new ViewTableTags(this);
        if(!this.table.is_personal)
            this.responsible = new ViewTableResponsible(this);
        this.deadline = new ViewTableDeadline(this);
        this.description = new ViewTableDescription(this);



        this.table.tasks.push(this);
    }
    
    setLevel(depth: number): ViewTableTask {
        this.depth = depth;

        while(this.name.getLevel() != this.depth) {
            if(this.name.getLevel() < this.depth)
                this.name.addLevel();
            else
                this.name.removeLevel();
        }

        return this;
    }

    destroy(): void {
        if(this.data.subtasks && this.data.subtasks.length) {
            for(const task of this.table.tasks) {
                if(this.data.subtasks.map(obj => obj.id).indexOf(task.data.id) != -1) {
                    task.destroy();
                }
            }
        }

        this.table.tasks = this.table.tasks.filter(obj => obj != this);
        
        this.object.remove();
    }

    async expand(is_phantom: boolean): Promise<void> {
        if(!is_phantom && !await this.onExpand()) return;

        this.is_expanded = !this.is_expanded;
        this.name.img_expand.toggleClass("task-table-cell__img_expand_open", this.is_expanded);
    }
}