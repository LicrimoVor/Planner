import { Client } from "../../client/init";
import { Ajax } from "../ajax/init";
import { getApiUrl } from "../config";
import { IStatusAPI } from "./interface/api";
import { IStatusListModel, IStatusModel } from "./interface/model";
import { STATUS_API_URL } from "./url";

export const StatusAPI: IStatusAPI = {
    getList: async function (): Promise<IStatusModel[]> {
        return (await Ajax.get({
            url: getApiUrl(STATUS_API_URL.LIST),
        })).success.results;
    },

    getByID: async function (id: number): Promise<boolean | IStatusModel> {
        const result = await Ajax.get({
            url: `${getApiUrl(STATUS_API_URL.LIST)}${id}/`,
            token: Client.getToken()
        });

        return result.success || false;
    },

    create: async function (data: IStatusModel): Promise<boolean | string[]> {
        const result = await Ajax.post({
            url: getApiUrl(STATUS_API_URL.LIST),
            token: Client.getToken(),
            data: data
        });

        return !result.fail ? true : result.fail.responseJSON;
    },

    remove: async function (id: number): Promise<boolean> {
        return (await Ajax.delete({
            url: `${getApiUrl(STATUS_API_URL.LIST)}${id}/`,
            token: Client.getToken(),
        })).fail ? false : true;
    },

    update: async function (id: number, data: IStatusModel): Promise<boolean> {
        return (await Ajax.put({
            url: `${getApiUrl(STATUS_API_URL.LIST)}${id}/`,
            token: Client.getToken(),
            data: data
        })).fail ? false : true;
    }
}