import { Client } from "../../client/init.js";
import { Ajax } from "../ajax/init.js";
import { getApiUrl } from "../config.js";
import { USER_API_URL } from "./url.js";
export const UserAPI = {
    getList: async function () {
        const result = (await Ajax.get({
            url: getApiUrl(USER_API_URL.LIST)
        })).success;
        const list = {
            count: result.count,
            next: result.next,
            previous: result.previous,
            results: result.results
        };
        return list;
    },
    getMe: async function () {
        const result = await Ajax.get({
            url: getApiUrl(USER_API_URL.MY_PROFILE),
            token: Client.getToken()
        });
        if (result.fail)
            return false;
        const profile = {
            id: result.success.id,
            username: result.success.username,
            password: result.success.password,
            email: result.success.email,
            first_name: result.success.first_name,
            last_name: result.success.last_name,
            telegram_id: result.success.telegram_id
        };
        return profile;
    },
    getById: async function (id) {
        const result = await Ajax.get({
            url: `${getApiUrl(USER_API_URL.MY_PROFILE)}${id}/`,
            token: Client.getToken()
        });
        if (result.fail)
            return false;
        const profile = {
            id: result.success.id,
            username: result.success.username,
            password: result.success.password,
            email: result.success.email,
            first_name: result.success.first_name,
            last_name: result.success.last_name,
            telegram_id: result.success.telegram_id
        };
        return profile;
    },
    getAuthToken: async function (username, password) {
        const result = await Ajax.post({
            url: getApiUrl(USER_API_URL.GET_TOKEN),
            data: { username: username, password: password }
        });
        return result.success ? result.success.auth_token : false;
    },
    removeAuthToken: async function () {
        // Если ошибки не возникает, возвращаем true
        return !(await Ajax.post({
            url: getApiUrl(USER_API_URL.REMOVE_TOKEN),
            token: Client.getToken()
        })).error ? true : false;
    },
    changePassword: async function (current_password, new_password) {
        const result = await Ajax.post({
            url: getApiUrl(USER_API_URL.CHANGE_PASSWORD),
            data: { current_password: current_password, new_password: new_password },
            token: Client.getToken()
        });
        return !result.fail ? true : result.fail.responseJSON;
    },
    register: async function (data) {
        const result = await Ajax.post({
            url: getApiUrl(USER_API_URL.REGISTER),
            data: data
        });
        return result.success ? true : result.fail.responseJSON;
    },
    updateFields: async function (data) {
        const result = await Ajax.patch({
            url: `${getApiUrl(USER_API_URL.MY_PROFILE)}`,
            token: Client.getToken(),
            data: data
        });
        return !result.fail ? true : result.fail.responseJSON;
    }
};
