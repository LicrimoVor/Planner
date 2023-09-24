import { IClient } from "./interface";

export const Client: IClient = {

    getToken(): string {
        return localStorage.getItem("token").length > 0 ? `Token ${localStorage.getItem("token")}` : "";
    },

    setToken: function (new_token: string): void {
        localStorage.setItem("token", new_token);
    },

    clearToken: function (): void {
        localStorage.setItem("token", "");
    },
    
}