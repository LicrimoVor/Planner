import { IRedirectManager } from "./interface";

export const RedirectManager: IRedirectManager = {
    redirect: function (url: any): void {
        window.location.href = `/frontend/html/${url}.html`;
    }
}