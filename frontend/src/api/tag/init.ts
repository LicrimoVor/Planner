import { Client } from "../../client/init";
import { Ajax } from "../ajax/init";
import { getApiUrl } from "../config";
import { ITagAPI } from "./interface/api";
import { ITagListModel, ITagModel } from "./interface/model";
import { TAG_API_URL } from "./url";

export const TagAPI: ITagAPI = {
    getList: async function (): Promise<ITagListModel> {
        return (await Ajax.get({
            url: getApiUrl(TAG_API_URL.LIST),
        })).success.results;
    },

    getByID: async function (id: number): Promise<boolean | ITagModel> {
        const result = await Ajax.get({
            url: `${getApiUrl(TAG_API_URL.LIST)}${id}/`,
            token: Client.getToken()
        });

        return result.success || false;
    },

    create: async function (data: ITagModel): Promise<boolean | string[]> {
        const result = await Ajax.post({
            url: getApiUrl(TAG_API_URL.LIST),
            token: Client.getToken(),
            data: data
        });

        return !result.fail ? true : result.fail.responseJSON;
    },

    remove: async function (id: number): Promise<boolean> {
        return (await Ajax.delete({
            url: `${getApiUrl(TAG_API_URL.LIST)}${id}/`,
            token: Client.getToken(),
        })).fail ? false : true;
    },

    update: async function (id: number, data: ITagModel): Promise<boolean> {
        return (await Ajax.put({
            url: `${getApiUrl(TAG_API_URL.LIST)}${id}/`,
            token: Client.getToken(),
            data: data
        })).fail ? false : true;
    }
}