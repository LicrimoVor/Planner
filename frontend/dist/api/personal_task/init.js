import { Client } from "../../client/init.js";
import { Ajax } from "../ajax/init.js";
import { getApiUrl } from "../config.js";
import { PERSONAL_API_URL } from "./url.js";
export const PersonalTaskAPI = {
    getList: async function (filters = "") {
        return (await Ajax.get({
            url: `${getApiUrl(PERSONAL_API_URL.LIST)}?main=true&${filters}`,
            token: Client.getToken()
        })).success;
    },
    getSubtaskList: async function (id, filters = "") {
        return (await Ajax.get({
            url: getApiUrl(`${PERSONAL_API_URL.LIST}${id}/${PERSONAL_API_URL.SUBTASKS}?${filters}`),
            token: Client.getToken()
        })).success.results;
    },
    getByID: async function (id) {
        const result = await Ajax.get({
            url: `${getApiUrl(PERSONAL_API_URL.LIST)}${id}/`,
            token: Client.getToken()
        });
        return result.success || false;
    },
    getFromSpaces: async function () {
        return (await Ajax.get({
            url: getApiUrl(PERSONAL_API_URL.FROM_SPACES),
            token: Client.getToken()
        })).success.results;
    },
    create: async function (data, is_subtask = false, parent_id = 0) {
        const result = await Ajax.post({
            url: getApiUrl(is_subtask ? `${PERSONAL_API_URL.LIST}${parent_id}/${PERSONAL_API_URL.SUBTASKS}` : PERSONAL_API_URL.LIST),
            token: Client.getToken(),
            data: data
        });
        return !result.fail ? result.success : result.fail.responseJSON;
    },
    remove: async function (id) {
        return (await Ajax.delete({
            url: `${getApiUrl(PERSONAL_API_URL.LIST)}${id}/${PERSONAL_API_URL.TREE}`,
            token: Client.getToken(),
        })).fail ? false : true;
    },
    update: async function (id, data) {
        return (await Ajax.put({
            url: `${getApiUrl(PERSONAL_API_URL.LIST)}${id}/`,
            token: Client.getToken(),
            data: data
        })).fail ? false : true;
    },
    updateFields: async function (id, data) {
        return (await Ajax.patch({
            url: `${getApiUrl(PERSONAL_API_URL.LIST)}${id}/`,
            token: Client.getToken(),
            data: data
        })).fail ? false : true;
    },
    move: async function (from_id, to_id) {
        return (await Ajax.get({
            url: `${getApiUrl(PERSONAL_API_URL.LIST)}${from_id}/to/${to_id}/`,
            token: Client.getToken()
        })).fail ? false : true;
    },
};
