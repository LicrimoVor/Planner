import { Client } from "../../client/init";
import { Ajax } from "../ajax/init";
import { getApiUrl } from "../config";
import { IPersonalTaskAPI } from "./interface/api";
import { IPersonalTaskListModel, IPersonalTaskModel } from "./interface/model";
import { PERSONAL_API_URL } from "./url";

export const PersonalTaskAPI: IPersonalTaskAPI = {
    getList: async function (filters: string = ""): Promise<IPersonalTaskListModel> {
        return (await Ajax.get({
            url: `${getApiUrl(PERSONAL_API_URL.LIST)}?main=true&${filters}`,
            token: Client.getToken()
        })).success;
    },

    getSubtaskList: async function (id: number, filters: string = ""): Promise<IPersonalTaskModel[]> {
        return (await Ajax.get({
            url: getApiUrl(`${PERSONAL_API_URL.LIST}${id}/${PERSONAL_API_URL.SUBTASKS}?${filters}`),
            token: Client.getToken()
        })).success.results;
    },

    getByID: async function (id: number): Promise<IPersonalTaskModel> {
        const result = await Ajax.get({
            url: `${getApiUrl(PERSONAL_API_URL.LIST)}${id}/`,
            token: Client.getToken()
        });

        return result.success || false;
    },

    getFromSpaces: async function (): Promise<IPersonalTaskListModel> {
        return (await Ajax.get({
            url: getApiUrl(PERSONAL_API_URL.FROM_SPACES),
            token: Client.getToken()
        })).success.results;
    },
    
    create: async function (data: IPersonalTaskModel, is_subtask: boolean = false, parent_id: number = 0): Promise<IPersonalTaskModel | string[]> {
        const result = await Ajax.post({
            url: getApiUrl(is_subtask ? `${PERSONAL_API_URL.LIST}${parent_id}/${PERSONAL_API_URL.SUBTASKS}` : PERSONAL_API_URL.LIST),
            token: Client.getToken(),
            data: data
        });

        return !result.fail ? result.success : result.fail.responseJSON;
    },

    remove: async function (id: number): Promise<boolean> {
        return (await Ajax.delete({
            url: `${getApiUrl(PERSONAL_API_URL.LIST)}${id}/${PERSONAL_API_URL.TREE}`,
            token: Client.getToken(),
        })).fail ? false : true;
    },

    update: async function (id: number, data: IPersonalTaskModel): Promise<boolean> {
        return (await Ajax.put({
            url: `${getApiUrl(PERSONAL_API_URL.LIST)}${id}/`,
            token: Client.getToken(),
            data: data
        })).fail ? false : true;
    },

    updateFields: async function (id: number, data: IPersonalTaskModel): Promise<boolean> {
        return (await Ajax.patch({
            url: `${getApiUrl(PERSONAL_API_URL.LIST)}${id}/`,
            token: Client.getToken(),
            data: data
        })).fail ? false : true;
    },

    move: async function(from_id: number, to_id: number): Promise<boolean> {
        return (await Ajax.get({
            url: `${getApiUrl(PERSONAL_API_URL.LIST)}${from_id}/to/${to_id}/`,
            token: Client.getToken()
        })).fail ? false : true;
    },
}