import { Client } from "../../client/init";
import { Ajax } from "../ajax/init";
import { getApiUrl } from "../config";
import { ISpaceAPI } from "./interface/api";
import { ISpaceModel } from "./interface/model";
import { SPACE_API_URL } from "./url";

export const SpaceAPI: ISpaceAPI = {
    getMy: async function (): Promise<ISpaceModel[]> {
        return (await Ajax.get({
            url: `${getApiUrl(SPACE_API_URL.LIST)}me`,
            token: Client.getToken()
        })).success.results;
    },

    getByID: async function (id: number): Promise<boolean | ISpaceModel> {
        return (await Ajax.get({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}`,
            token: Client.getToken()
        })).success || false;
    }
}