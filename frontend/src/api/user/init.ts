import { Client } from "../../client/init";
import { Ajax } from "../ajax/init";
import { getApiUrl } from "../config";
import { IUserAPI, IUserAPI_List } from "./interface/api";
import { IUserModel } from "./interface/model";
import { USER_API_URL } from "./url";

export const UserAPI: IUserAPI = {
    getList: async function (): Promise<IUserAPI_List> {
        const result = (await Ajax.get({
            url: getApiUrl(USER_API_URL.LIST)
        })).success;

        const list: IUserAPI_List = {
            count: result.count,
            next: result.next,
            previous: result.previous,
            results: result.results
        };

        return list;
    },

    getMe: async function (): Promise<boolean | IUserModel> {
        const result = await Ajax.get({
            url: getApiUrl(USER_API_URL.MY_PROFILE),
            token: Client.getToken()
        });

        if(result.fail)
            return false;

        const profile: IUserModel = {
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

    getById: async function (id: number): Promise<boolean | IUserModel> {
        const result = await Ajax.get({
            url: `${getApiUrl(USER_API_URL.MY_PROFILE)}${id}/`,
            token: Client.getToken()
        });

        if(result.fail)
            return false;

        const profile: IUserModel = {
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

    getAuthToken: async function (username: string, password: string): Promise<boolean | string> {
        const result = await Ajax.post({
            url: getApiUrl(USER_API_URL.GET_TOKEN),
            data: {username: username, password: password}
        });

        return result.success ? result.success.auth_token : false;
    },

    removeAuthToken: async function (): Promise<boolean> {
        // Если ошибки не возникает, возвращаем true
        return !(await Ajax.post({
            url: getApiUrl(USER_API_URL.REMOVE_TOKEN),
            token: Client.getToken()
        })).error ? true : false;
    },

    changePassword: async function (current_password: string, new_password: string): Promise<boolean | string[]> {
        const result = await Ajax.post({
            url: getApiUrl(USER_API_URL.CHANGE_PASSWORD),
            data: {current_password: current_password, new_password: new_password},
            token: Client.getToken()
        });

        return !result.fail ? true : result.fail.responseJSON;
    },

    register: async function (data: IUserModel): Promise<boolean | string[]> {
        const result = await Ajax.post({
            url: getApiUrl(USER_API_URL.REGISTER),
            data: data
        });

        return result.success ? true : result.fail.responseJSON;
    },

    updateFields: async function (data: IUserModel): Promise<boolean | string[]> {
        const result = await Ajax.patch({
            url: `${getApiUrl(USER_API_URL.MY_PROFILE)}`,
            token: Client.getToken(),
            data: data
        });
        return !result.fail ? true : result.fail.responseJSON;
    }
};