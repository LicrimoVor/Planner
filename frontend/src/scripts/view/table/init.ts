import { PersonalTaskAPI } from "../../../api/personal_task/init";
import { PersonalTaskModelDefault } from "../../../api/personal_task/interface/model";
import { SpaceTaskAPI } from "../../../api/space_task/init";
import { ISpaceTaskModel, SpaceTaskModelDefault } from "../../../api/space_task/interface/model";
import { IStatusModel } from "../../../api/status/interface/model";
import { ITagModel } from "../../../api/tag/interface/model";
import { ITaskModel } from "../../../api/task/interface";
import { IUserModel } from "../../../api/user/interface/model";
import { getFilterParams } from "../filter/init";
import { ViewTable } from "./implement/table";
import { ViewTableTask } from "./implement/task";

let table: ViewTable;
let is_personal: boolean;
let space_id: number;
let user_id: number;

export function createViewTable(status_list: IStatusModel[], tags_list: ITagModel[], _space_id?: number, _user_id?: number, staff_list?: IUserModel[]) {
    space_id = _space_id;
    user_id = _user_id;

    is_personal = space_id ? false : true;

    table = new ViewTable({
        header: is_personal ? [ // Персональная таблица
            ["name", "Название"],
            ["status", "Статус"],
            ["tags", "Теги"],
            ["deadline", "Дедлайн"],
            ["description", "Описание"],
        ] : [ // Таблица для пространства
            ["name", "Название"],
            ["status", "Статус"],
            ["tags", "Теги"],
            ["responsibles", "Ответственные"],
            ["deadline", "Дедлайн"],
            ["description", "Описание"],
        ],
        is_personal: is_personal,
        status_list: status_list,
        tags_list: tags_list,
        staff_list: staff_list,
        onAdd: async () => {
            let task = is_personal ?
                await PersonalTaskAPI.create(PersonalTaskModelDefault) :
                await SpaceTaskAPI.create(space_id, {...SpaceTaskModelDefault, author: user_id} as {});
            if(!task) return false;

            task = task as ITaskModel;

            addViewTableTask(task).name.focus();

            return true;
        },
    });
}

export function updateViewTable(tasks: ITaskModel[]) {
    table.clear();

    for(const task of tasks.reverse()) {
        addViewTableTask(task);
    }
}

export function addViewTableTask(task: ITaskModel, parent?: ViewTableTask): ViewTableTask {
    const row = new ViewTableTask(table, {
        data: task,
        depth: parent ? (parent.depth + 1) : 0,
        parent: parent,

        onNameChange: async (value: string) => {
            return is_personal ?
                await PersonalTaskAPI.updateFields(task.id, {name: value}) :
                await SpaceTaskAPI.updateFields(space_id, task.id, {name: value});
        },

        onExpand: async () => {
            return true;
        },

        onAddSubtask: async () => {
            return true;
        },

        onStatusChange: async (status_id: number) => {
            return is_personal ?
                await PersonalTaskAPI.updateFields(task.id, {status: status_id} as {}) :
                await SpaceTaskAPI.updateFields(space_id, task.id, {status: status_id} as {});
        },

        onTagAdd: async (tags: number[]) => {
            return is_personal ?
                await PersonalTaskAPI.updateFields(task.id, {tags: tags} as {}) :
                await SpaceTaskAPI.updateFields(space_id, task.id, {tags: tags} as {});
        },

        onTagRemove: async (tags: number[]) => {
            return is_personal ?
                await PersonalTaskAPI.updateFields(task.id, {tags: tags} as {}) :
                await SpaceTaskAPI.updateFields(space_id, task.id, {tags: tags} as {});
        },

        onResponsiblesAdd: async (users: number[]) => {
            return is_personal ?
                false :
                await SpaceTaskAPI.updateFields(space_id, task.id, {responsibles: users} as {});
        },

        onResponsiblesRemove: async (users: number[]) => {
            return is_personal ?
                false :
                await SpaceTaskAPI.updateFields(space_id, task.id, {responsibles: users} as {});
        },

        onDeadlineChange: async (deadline: number) => {
            return is_personal ?
                await PersonalTaskAPI.updateFields(task.id, {deadline: deadline}) :
                await SpaceTaskAPI.updateFields(space_id, task.id, {deadline: deadline});
        },

        onDescriptionChange: async (value: string) => {
            return is_personal ?
                await PersonalTaskAPI.updateFields(task.id, {description: value}) :
                await SpaceTaskAPI.updateFields(space_id, task.id, {description: value});
        },

        onAttach: async (parent: ViewTableTask) => {
            return true;
        },

        onRemove: async () => {
            return true;
        }
    });

    row.onExpand = async () => {
        if(!row.data.subtasks)
            row.data.subtasks = is_personal ?
                                await PersonalTaskAPI.getSubtaskList(row.data.id, getFilterParams()) :
                                await SpaceTaskAPI.getSubtaskList(space_id, row.data.id, getFilterParams());

        if(!row.data.subtasks.length)
            return false;

        for(const subtask of row.data.subtasks) {
            if(!row.is_expanded) {
                addViewTableTask(subtask, row);
            }
            else {
                $.each(row.table.tasks, function() {
                    if(this.data.id == subtask.id)
                        this.destroy();
                });
            }
        }

        return true;
    };

    row.onAddSubtask = async () => {
        if(row.depth == 4) return false;

        if(!row.is_expanded)
            await row.expand(false);

        let task = is_personal ?
            await PersonalTaskAPI.create(PersonalTaskModelDefault, true, row.data.id) :
            await SpaceTaskAPI.create(space_id, {...SpaceTaskModelDefault, author: user_id} as {}, true, row.data.id);
        if(!task) return false;

        task = task as ITagModel;

        if(!row.is_expanded)
            row.expand(true);
        row.data.subtasks.unshift(task);
        addViewTableTask(task, row).name.focus();
        
        return true;
    };

    row.onAttach = async (parent?: ViewTableTask) => {
        row.destroy();

        if(row.parent) {
            row.parent.data.subtasks = row.parent.data.subtasks.filter(obj => obj.id != row.data.id);
            if(!row.parent.data.subtasks.length && row.parent.is_expanded) {
                row.parent.expand(false);
            }
        }

        if(!parent) {
            addViewTableTask(row.data);
        }
        else {
            if(!parent.is_expanded)
                await parent.expand(false);
            parent.data.subtasks.push(row.data);
            addViewTableTask(row.data, parent);
            if(!parent.is_expanded)
                parent.expand(true);
        }

        if(is_personal)
            await PersonalTaskAPI.move(row.data.id, parent.data.id);
        else
            await SpaceTaskAPI.move(space_id, row.data.id, parent.data.id);

        return true;
    };

    row.onRemove = async () => {
        if(is_personal && !PersonalTaskAPI.remove(task.id)) return false;
        if(!is_personal && !SpaceTaskAPI.remove(space_id, task.id)) return false;

        row.destroy();

        return true;
    }

    return row;
}