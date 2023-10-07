export const Client = {
    getToken() {
        return localStorage.getItem("token").length > 0 ? `Token ${localStorage.getItem("token")}` : "";
    },
    setToken: function (new_token) {
        localStorage.setItem("token", new_token);
    },
    clearToken: function () {
        localStorage.setItem("token", "");
    },
    isContextMenu: function () {
        return JSON.parse(localStorage.getItem("context_menu"));
    },
    openContextMenu: function () {
        localStorage.setItem("context_menu", JSON.stringify(true));
    },
    closeContextMenu: function () {
        localStorage.setItem("context_menu", JSON.stringify(false));
    }
};
