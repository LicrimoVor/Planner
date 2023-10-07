export const Ajax = {
    get: async function (config) {
        let request_result = { success: null, fail: null };
        await $.ajax({
            url: config.url,
            type: "GET",
            headers: config.token ? { Authorization: config.token } : {}
        }).then(
        // Success callback
        function (callback_data) {
            request_result.success = callback_data;
        }, 
        // Fail callback
        function (callback_data) {
            request_result.fail = callback_data;
        });
        return request_result;
    },
    post: async function (config) {
        let request_result = { success: null, fail: null };
        await $.ajax({
            url: config.url,
            type: "POST",
            headers: config.token ? { Authorization: config.token, "Content-Type": "application/json" } : { "Content-Type": "application/json" },
            data: JSON.stringify(config.data)
        }).then(
        // Success callback
        function (callback_data) {
            request_result.success = callback_data;
        }, 
        // Fail callback
        function (callback_data) {
            request_result.fail = callback_data;
        });
        return request_result;
    },
    delete: async function (config) {
        let request_result = { success: null, fail: null };
        await $.ajax({
            url: config.url,
            type: "DELETE",
            headers: config.token ? { Authorization: config.token, "Content-Type": "application/json" } : { "Content-Type": "application/json" },
            data: JSON.stringify(config.data)
        }).then(
        // Success callback
        function (callback_data) {
            request_result.success = callback_data;
        }, 
        // Fail callback
        function (callback_data) {
            request_result.fail = callback_data;
        });
        return request_result;
    },
    put: async function (config) {
        let request_result = { success: null, fail: null };
        await $.ajax({
            url: config.url,
            type: "PUT",
            headers: config.token ? { Authorization: config.token, "Content-Type": "application/json" } : { "Content-Type": "application/json" },
            data: JSON.stringify(config.data)
        }).then(
        // Success callback
        function (callback_data) {
            request_result.success = callback_data;
        }, 
        // Fail callback
        function (callback_data) {
            request_result.fail = callback_data;
        });
        return request_result;
    },
    patch: async function (config) {
        let request_result = { success: null, fail: null };
        await $.ajax({
            url: config.url,
            type: "PATCH",
            headers: config.token ? { Authorization: config.token, "Content-Type": "application/json" } : { "Content-Type": "application/json" },
            data: JSON.stringify(config.data)
        }).then(
        // Success callback
        function (callback_data) {
            request_result.success = callback_data;
        }, 
        // Fail callback
        function (callback_data) {
            request_result.fail = callback_data;
        });
        return request_result;
    }
};
