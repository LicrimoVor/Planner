import { IAjax, IAjaxConfig } from "./interface";

export const Ajax: IAjax = {
    get: async function (config: IAjaxConfig): Promise<{}> {
        let request_result = {success: null, fail: null};
        
        await $.ajax({
            url: config.url,
            type: "GET",
            headers: config.token ? {Authorization: config.token} : {}
        }).then(
            // Success callback
            function (callback_data) {
                request_result.success = callback_data;
            },
            // Fail callback
            function (callback_data) {
                request_result.fail = callback_data;
            }
        );

        return request_result;
    },

    post: async function (config: IAjaxConfig): Promise<{}> {
        let request_result = {success: null, fail: null};
        
        await $.ajax({
            url: config.url,
            type: "POST",
            headers: config.token ? {Authorization: config.token} : {},
            data: config.data
        }).then(
            // Success callback
            function (callback_data) {
                request_result.success = callback_data;
            },
            // Fail callback
            function (callback_data) {
                request_result.fail = callback_data;
            }
        );

        return request_result;
    },

    delete: async function (config: IAjaxConfig): Promise<{}> {
        let request_result = {success: null, fail: null};
        
        await $.ajax({
            url: config.url,
            type: "DELETE",
            headers: config.token ? {Authorization: config.token} : {},
            data: config.data
        }).then(
            // Success callback
            function (callback_data) {
                request_result.success = callback_data;
            },
            // Fail callback
            function (callback_data) {
                request_result.fail = callback_data;
            }
        );

        return request_result;
    },

    put: async function (config: IAjaxConfig): Promise<{}> {
        let request_result = {success: null, fail: null};
        
        await $.ajax({
            url: config.url,
            type: "PUT",
            headers: config.token ? {Authorization: config.token} : {},
            data: config.data
        }).then(
            // Success callback
            function (callback_data) {
                request_result.success = callback_data;
            },
            // Fail callback
            function (callback_data) {
                request_result.fail = callback_data;
            }
        );

        return request_result;
    }
}