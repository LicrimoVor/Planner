import { Client } from "../../client/init.js";
import { Ajax } from "../ajax/init.js";
import { getApiUrl } from "../config.js";
import { SPACE_API_URL } from "../space/url.js";
import { SPACE_TASK_API_URL } from "./url.js";
export const SpaceTaskAPI = {
    getList: async function (id, filters = "") {
        return (await Ajax.get({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}?main=true&${filters}`,
            token: Client.getToken()
        })).success;
    },
    getSubtaskList: async function (id, task_id, filters = "") {
        return (await Ajax.get({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${task_id}/${SPACE_TASK_API_URL.SUBTASKS}${filters}`,
            token: Client.getToken()
        })).success.results;
    },
    getByID: async function (id, task_id) {
        const result = await Ajax.get({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${task_id}/`,
            token: Client.getToken()
        });
        return result.success || false;
    },
    create: async function (id, data, is_subtask = false, parent_id = 0) {
        const result = await Ajax.post({
            url: getApiUrl(is_subtask ?
                `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${parent_id}/${SPACE_TASK_API_URL.SUBTASKS}`
                :
                    `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}`),
            token: Client.getToken(),
            data: data
        });
        return !result.fail ? result.success : result.fail.responseJSON;
    },
    remove: async function (id, task_id) {
        return (await Ajax.delete({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${task_id}/`,
            token: Client.getToken(),
        })).fail ? false : true;
    },
    update: async function (id, task_id, data) {
        return (await Ajax.put({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${task_id}/`,
            token: Client.getToken(),
            data: data
        })).fail ? false : true;
    },
    updateFields: async function (id, task_id, data) {
        return (await Ajax.patch({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${task_id}/`,
            token: Client.getToken(),
            data: data
        })).fail ? false : true;
    },
    move: async function (id, from_id, to_id) {
        return (await Ajax.get({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}/${SPACE_TASK_API_URL.LIST}${from_id}/to/${to_id}/`,
            token: Client.getToken()
        })).fail ? false : true;
    },
};
