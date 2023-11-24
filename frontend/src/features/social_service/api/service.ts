import {apiInstance} from "@shared/api";

const BASE_URL = "auth/login/";

const ENDPOINTS = {
    VK: `${BASE_URL}vk-oauth2/`,
    GOOGLE: `${BASE_URL}google-oauth2/`,
    YANDEX: `${BASE_URL}yandex-oauth2/`,
    MAIL: `${BASE_URL}mailru-oauth2/`,
}

export class SocialService {
    static async vk(): Promise<void> {
        return await apiInstance.redirect(ENDPOINTS.VK);
    }

    static async google(): Promise<void> {
        return await apiInstance.redirect(ENDPOINTS.GOOGLE);
    }

    static async yandex(): Promise<void> {
        return await apiInstance.redirect(ENDPOINTS.YANDEX);
    }

    static async mail(): Promise<void> {
        return await apiInstance.redirect(ENDPOINTS.MAIL);
    }
}