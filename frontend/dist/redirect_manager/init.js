export const RedirectManager = {
    redirect: function (url, params) {
        window.location.href = `/frontend/html/${url}.html?${params || ""}`;
    },
    get: function () {
        return window.location.pathname;
    },
    getUrl: function (url) {
        return `/frontend/html/${url}.html`;
    }
};
