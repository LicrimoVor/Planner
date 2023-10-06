import { Client } from "../../client/init";
import { Ajax } from "../ajax/init";
import { getApiUrl } from "../config";
import { SPACE_API_URL } from "../space/url";
import { ISpaceTaskAPI } from "./interface/api";
import { ISpaceTaskListModel, ISpaceTaskModel } from "./interface/model";
import { SPACE_TASK_API_URL } from "./url";

export const SpaceTaskAPI: ISpaceTaskAPI = {
    getList: async function (id: number, filters: string = ""): Promise<ISpaceTaskListModel> {
        return (await Ajax.get({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}?main=true&${filters}`,
            token: Client.getToken()
        })).success;
    },

    getSubtaskList: async function (id: number, task_id: number, filters: string = ""): Promise<ISpaceTaskModel[]> {
        return (await Ajax.get({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${task_id}/${SPACE_TASK_API_URL.SUBTASKS}${filters}`,
            token: Client.getToken()
        })).success.results;
    },

    getByID: async function (id: number, task_id: number): Promise<ISpaceTaskModel> {
        const result = await Ajax.get({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${task_id}/`,
            token: Client.getToken()
        });

        return result.success || false;
    },
    
    create: async function (id: number, data: ISpaceTaskModel, is_subtask: boolean = false, parent_id: number = 0): Promise<ISpaceTaskModel | string[]> {
        const result = await Ajax.post({
            url: getApiUrl(is_subtask ? 
                `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${parent_id}/${SPACE_TASK_API_URL.SUBTASKS}` 
                : 
                `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}`
            ),
            token: Client.getToken(),
            data: data
        });

        return !result.fail ? result.success : result.fail.responseJSON;
    },

    remove: async function (id: number, task_id: number): Promise<boolean> {
        return (await Ajax.delete({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${task_id}/`,
            token: Client.getToken(),
        })).fail ? false : true;
    },

    update: async function (id: number, task_id: number, data: ISpaceTaskModel): Promise<boolean> {
        return (await Ajax.put({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${task_id}/`,
            token: Client.getToken(),
            data: data
        })).fail ? false : true;
    },

    updateFields: async function (id: number, task_id: number, data: ISpaceTaskModel): Promise<boolean> {
        return (await Ajax.patch({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${task_id}/`,
            token: Client.getToken(),
            data: data
        })).fail ? false : true;
    },

    move: async function(id: number, from_id: number, to_id: number): Promise<boolean> {
        return (await Ajax.get({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${from_id}/to/${to_id}/`,
            token: Client.getToken()
        })).fail ? false : true;
    },
}