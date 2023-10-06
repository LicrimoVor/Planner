import { IRedirectManager } from "./interface";

export const RedirectManager: IRedirectManager = {
    redirect: function (url: string, params?: string): void {
        window.location.href = `/frontend/html/${url}.html?${params || ""}`;
    },

    get: function (): string {
        return window.location.pathname;
    },

    getUrl: function (url: string): string {
        return `/frontend/html/${url}.html`;
    }
}