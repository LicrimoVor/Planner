import { Client } from "../../client/init.js";
import { Ajax } from "../ajax/init.js";
import { getApiUrl } from "../config.js";
import { SPACE_API_URL } from "./url.js";
export const SpaceAPI = {
    getMy: async function () {
        return (await Ajax.get({
            url: `${getApiUrl(SPACE_API_URL.LIST)}me`,
            token: Client.getToken()
        })).success.results;
    },
    getByID: async function (id) {
        return (await Ajax.get({
            url: `${getApiUrl(SPACE_API_URL.LIST)}${id}`,
            token: Client.getToken()
        })).success || false;
    }
};
