import { PersonalTaskAPI } from "../../api/personal_task/init";
import { IPersonalTaskModel } from "../../api/personal_task/interface/model";
import { ViewTable } from "../view/models/table";
import { ViewTableCellDeadline } from "../view/models/table/deadline";
import { ViewTableCellDescription } from "../view/models/table/description";
import { ViewTableCellName } from "../view/models/table/name";
import { IViewTableRow, ViewTableRow } from "../view/models/table/row";
import { ViewTableCellStatus } from "../view/models/table/status";
import { ViewTableCellTags } from "../view/models/table/tags";

let table: ViewTable;
let task_data = {};

$(async function () {
    table = new ViewTable($(".task-wrapper"), [
        ["name", "Название"],
        ["status", "Статус"],
        ["tags", "Теги"],
        ["deadline", "Дедлайн"],
        ["description", "Описание"],
    ]);

    const result = (await PersonalTaskAPI.getList()).results;

    for(const task of result) {
        createTask(task, 0);
    }
});

function createTask(data: IPersonalTaskModel, depth: number, parent?: IViewTableRow): void {
    task_data[data.id.toString()] = data;

    const row = new ViewTableRow(table, parent);
    row.depth = depth;
    
    row.name = new ViewTableCellName(row, data.name);
    row.name.setLevels(row.depth);
    row.name.onExpand(expandTask, row, data.id);

    row.status = new ViewTableCellStatus(row, data.status);

    row.tags = new ViewTableCellTags(row, data.tags);

    let date_str: string = "";
    if(data.deadline) {
        date_str = new Date(data.deadline).toLocaleString();
        date_str = date_str.slice(0, date_str.indexOf(","));
    }
    row.deadline = new ViewTableCellDeadline(row, date_str)

    row.description = new ViewTableCellDescription(row, data.description);
}

async function expandTask(row: ViewTableRow, id: number): Promise<boolean> {
    if(!task_data[id.toString()].subtasks)
        task_data[id.toString()].subtasks = await PersonalTaskAPI.getSubtaskList(id);

    let data: IPersonalTaskModel[] = task_data[id.toString()].subtasks || [];

    if(!data.length) return false;

    if(!row.name.is_expanded) {
        $.each(data, function(index: number, value: IPersonalTaskModel) {
            createTask(value, row.depth + 1, row);
        });
    }
    else {
        $.each(table.rows, (index: number, value: IViewTableRow) => {
            if(value.parent == row)
                value.destroy();
        });
    }

    return true;
}

// async function createSubtasks(main_task: IPersonalTaskModel, depth: number = 0) {
//     console.log(main_task.name, main_task.subtasks);
//     if(!main_task.subtasks) return;

//     depth++;

//     for(let task of main_task.subtasks) {
//         task = await PersonalTaskAPI.getByID(task.id);
//         createTask(task, depth);
//         await createSubtasks(task, depth);
//     }
// }