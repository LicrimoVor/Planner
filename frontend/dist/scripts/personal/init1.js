// import { event, get } from "jquery";
// import { PersonalTaskAPI } from "../../api/personal_task/init.js";
// import { IPersonalTaskModel, PersonalTaskModelDefault } from "../../api/personal_task/interface/model.js";
// import { ContextMenu } from "../context/menu.js";
// import { ViewTable } from "../view/models/table.js";
// import { ViewTableCellDeadline } from "../view/models/table/deadline.js";
// import { ViewTableCellDescription } from "../view/models/table/description.js";
// import { ViewTableCellName } from "../view/models/table/name.js";
// import { IViewTableRow, ViewTableRow, ViewTableRowAdd } from "../view/models/table/row.js";
// import { ViewTableCellStatus } from "../view/models/table/status.js";
// import { ViewTableCellTags } from "../view/models/table/tags.js";
// import { CONTEXT_MENU_TYPE } from "../context/interface/menu.js";
// import { IStatusModel } from "../../api/status/interface/model.js";
// import { StatusAPI } from "../../api/status/init.js";
// import { IContextMenuItemConfig } from "../context/interface/item.js";
// import { ITagModel } from "../../api/tag/interface/model.js";
// import { TagAPI } from "../../api/tag/init.js";
// import { createFilterMenu } from "../view/filter/init.js";
// let table: ViewTable;
// let task_data = {};
// function getTask(id: number): IPersonalTaskModel {return task_data[id.toString()]};
// function setTask(id: number, data: IPersonalTaskModel): IPersonalTaskModel {task_data[id.toString()] = data; return getTask(id)};
// function setTaskData(id: number, property: string, value: any): IPersonalTaskModel {task_data[id.toString()][property] = value; return getTask(id)}
// let status_list: IStatusModel[] = [];
// let tags_list: ITagModel[] = [];
// $(async function () {
//     status_list = await StatusAPI.getList();
//     tags_list = await TagAPI.getList();
//     table = new ViewTable($(".task-wrapper"), [
//         ["name", "Название"],
//         ["status", "Статус"],
//         ["tags", "Теги"],
//         ["deadline", "Дедлайн"],
//         ["description", "Описание"],
//     ]);
//     table.add = new ViewTableRowAdd(table, "Добавить новую задачу...");
//     table.add.onAdd(addNewTask);
//     createFilterMenu(status_list, tags_list);
//     const result = (await PersonalTaskAPI.getList()).results.reverse();
//     for(const task of result) {
//         createTask(task, 0);
//     }
// });
// function createTask(data: IPersonalTaskModel, depth: number = 0, parent?: ViewTableRow): ViewTableRow {
//     // data.subtasks = [];
//     setTask(data.id, data);
//     const row = new ViewTableRow(table, data.id, parent, !parent ? table.add : null);
//     row.depth = depth;
//     row.object.on("contextmenu", (e) => {
//         if(row.is_hovered) return;
//         e.preventDefault();
//         let items: IContextMenuItemConfig[] = [
//             {text: "Действия:", is_active: false},
//             {text: `${row.name.is_expanded ? "Скрыть" : "Раскрыть"}`, callback: async (): Promise<boolean> => {row.name.expand(); return true;}},
//             {text: "Добавить подзадачу", callback: async (): Promise<boolean> => {addNewTask(row, data.id); return true;}},
//             {text: "<span style='color: rgb(175, 52, 52);'>Удалить</span>", callback: async (): Promise<boolean> => {destroyTask(data.id, row); return true;}}
//         ];
//         new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.DEFAULT, items);
//     });
//     row.name = new ViewTableCellName(row, data.name);
//     row.name.setLevels(row.depth);
//     row.name.onExpand(expandTask, row, data.id);
//     row.name.onEnter(changeName, row, data.id);
//     row.status = new ViewTableCellStatus(row, data.status);
//     row.status.object.on("click", (e) => {
//         e.preventDefault();
//         let items: IContextMenuItemConfig[] = [{text: "Выбор статуса:", is_active: false}];
//         for(const status of status_list) {
//             items.push({
//                 text: status.name,
//                 is_active: true,
//                 color: status.color,
//                 callback: async (): Promise<boolean> => {
//                     if(await setStatus(data.id, status)) {
//                         row.status.update(status);
//                         return true;
//                     }
//                     return false;
//                 }
//             });
//         }
//         new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.STATUS, items);
//     });
//     row.tags = new ViewTableCellTags(row, data.tags);
//     row.tags.img_add.on("click", (e) => {
//         e.preventDefault();
//         let items: IContextMenuItemConfig[] = [{text: "Выбор тега:", is_active: false}];
//         for(const tag of tags_list) {
//             items.push({
//                 text: tag.name,
//                 is_active: true,
//                 color: tag.color,
//                 callback: async (): Promise<boolean> => {
//                     if(getTask(data.id).tags.map(obj => obj.id).indexOf(tag.id) >= 0) return false;
//                     if(await setTags(data.id, getTask(data.id).tags.concat(tag))) {
//                         row.tags.add(tag);
//                         return true;
//                     }
//                     return false;
//                 }
//             });
//         }
//         new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.STATUS, items);
//     });
//     row.tags.onRemove = async (tags: number[]) => {
//         getTask(data.id).tags = getTask(data.id).tags.filter(obj => tags.indexOf(obj.id) >= 0);
//         await PersonalTaskAPI.updateFields(data.id, {tags: tags} as {});
//         return true;
//     }
//     let date_str: string = "-";
//     if(data.deadline) {
//         date_str = new Date(data.deadline).toLocaleString();
//         date_str = date_str.slice(0, date_str.indexOf(","));
//     }
//     row.deadline = new ViewTableCellDeadline(row, date_str)
//     row.deadline.onChange = async () => {
//         const date = new Date(row.deadline.input.val() as string);
//         setTaskData(data.id, "deadline", row.deadline.input.val());
//         if(!await PersonalTaskAPI.updateFields(data.id, {deadline: getTask(data.id).deadline})) return false;
//         row.deadline.label.html(date.toLocaleString().slice(0, date.toLocaleString().indexOf(",")));
//         return true;
//     };
//     row.description = new ViewTableCellDescription(row, data.description);
//     row.object.show(250);
//     row.onAdd(addNewTask, row, data.id);
//     row.onAttach = async (new_parent_id: number) => {
//         row.destroy();
//         if(row.parent) {
//             getTask(row.parent.id).subtasks = getTask(row.parent.id).subtasks.filter(obj => obj.id != data.id);
//             if(!getTask(row.parent.id).subtasks.length && row.parent.name.is_expanded) {
//                 row.parent.name.expand();
//             }
//             // await PersonalTaskAPI.updateFields(row.parent.id, {
//             //     subtasks: getTask(row.parent.id).subtasks.map(obj => obj.id)
//             // } as {});
//         }
//         if(!new_parent_id) {
//             createTask(getTask(data.id), 0);
//         }
//         else {
//             for(const _row of table.rows) {
//                 if(_row.id != new_parent_id) continue
//                 if(!_row.name.is_expanded)
//                     await _row.name.expand();
//                 getTask(new_parent_id).subtasks.push(getTask(data.id));
//                 createTask(getTask(data.id), _row.depth + 1, _row);
//                 if(!_row.name.is_expanded)
//                     _row.name.expand(true);
//                 break;
//             }
//             // await PersonalTaskAPI.updateFields(new_parent_id, {subtasks: getTask(new_parent_id).subtasks.map(obj => obj.id)} as {});
//         }
//         await PersonalTaskAPI.move(data.id, new_parent_id);
//         return true;
//     }
//     return row;
// }
// async function expandTask(row: ViewTableRow, id: number): Promise<boolean> {
//     if(!getTask(id).subtasks) {
//         getTask(id).subtasks = await PersonalTaskAPI.getSubtaskList(id);
//     }
//     let data: IPersonalTaskModel[] = getTask(id).subtasks;
//     if(!data.length && !row.name.is_expanded) return false;
//     if(!row.name.is_expanded) {
//         $.each(data.slice().reverse(), function(index: number, value: IPersonalTaskModel) {
//             createTask(value, row.depth + 1, row);
//         });
//     }
//     else {
//         $.each(table.rows, (index: number, value: IViewTableRow) => {
//             if(value.parent == row)
//                 value.destroy();
//         });
//     }
//     return true;
// }
// async function addNewTask(parent?: ViewTableRow, parent_id?: number): Promise<boolean> {
//     if(parent) {
//         if(parent.depth == 4) return false;
//         if(!parent.name.is_expanded) {
//             await parent.name.expand();
//         }
//         const task = await PersonalTaskAPI.create(PersonalTaskModelDefault, true, parent_id);
//         if(!task) return false;
//         if(!parent.name.is_expanded)
//             parent.name.expand(true);
//         getTask(parent_id).subtasks.unshift(task as IPersonalTaskModel);
//         createTask(task as IPersonalTaskModel, parent.depth + 1, parent).name.openInput();
//     }
//     else {
//         const task = await PersonalTaskAPI.create(PersonalTaskModelDefault);
//         if(!task) return false;
//         createTask(task as IPersonalTaskModel).name.openInput();
//     }
//     return true;
// }
// async function changeName(row: ViewTableRow, id: number): Promise<boolean> {
//     const text_value = row.name.input.val() as string;
//     setTaskData(id, "name", text_value);
//     return await PersonalTaskAPI.updateFields(id, {name: text_value} as IPersonalTaskModel);
// }
// async function setStatus(id: number, data: IStatusModel) {
//     return await PersonalTaskAPI.updateFields(id, {status: data.id} as {});
// }
// async function setTags(id: number, data: ITagModel[]) {
//     if(await PersonalTaskAPI.updateFields(id, {tags: data.map(obj => obj.id)} as {})) {
//         getTask(id).tags = data;
//         return true;
//     }
//     return false;
// }
// async function destroyTask(id: number, row: ViewTableRow): Promise<boolean> {
//     if(!await PersonalTaskAPI.remove(id)) return false;
//     if(row.parent) {
//         getTask(row.parent.id).subtasks = getTask(row.parent.id).subtasks.filter(obj => obj != getTask(id));
//         if(row.parent.name.is_expanded && !getTask(row.parent.id).subtasks.length)
//             row.parent.name.expand();
//     }
//     row.destroy();
//     setTask(id, undefined);
//     return true;
// }
