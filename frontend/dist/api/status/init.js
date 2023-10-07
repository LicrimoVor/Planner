import { Client } from "../../client/init.js";
import { Ajax } from "../ajax/init.js";
import { getApiUrl } from "../config.js";
import { STATUS_API_URL } from "./url.js";
export const StatusAPI = {
    getList: async function () {
        return (await Ajax.get({
            url: getApiUrl(STATUS_API_URL.LIST),
        })).success.results;
    },
    getByID: async function (id) {
        const result = await Ajax.get({
            url: `${getApiUrl(STATUS_API_URL.LIST)}${id}/`,
            token: Client.getToken()
        });
        return result.success || false;
    },
    create: async function (data) {
        const result = await Ajax.post({
            url: getApiUrl(STATUS_API_URL.LIST),
            token: Client.getToken(),
            data: data
        });
        return !result.fail ? true : result.fail.responseJSON;
    },
    remove: async function (id) {
        return (await Ajax.delete({
            url: `${getApiUrl(STATUS_API_URL.LIST)}${id}/`,
            token: Client.getToken(),
        })).fail ? false : true;
    },
    update: async function (id, data) {
        return (await Ajax.put({
            url: `${getApiUrl(STATUS_API_URL.LIST)}${id}/`,
            token: Client.getToken(),
            data: data
        })).fail ? false : true;
    }
};
