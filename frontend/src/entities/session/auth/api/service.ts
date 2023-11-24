import {
    ILoginParams,
    IRecoveryPasswordConfirmParams,
    IRecoveryPasswordParams,
    IRegistrationParams,
    IRegistrationResponse
} from "./models";
import {apiInstance, ResponseErrorData} from "@shared/api";

const BASE_URL = "auth/";

const ENDPOINTS = {
    LOGIN: `${BASE_URL}login/`,
    REGISTRATION: `${BASE_URL}registration/`,
    LOGOUT: `${BASE_URL}logout/`,
    RECOVERY_PASSWORD: `users/reset_password/`,
    RECOVERY_PASSWORD_CONFIRM: `users/reset_password_confirm/`,
}

export class AuthService {
    static async login(params: ILoginParams): Promise<void> {
        return await apiInstance.post(ENDPOINTS.LOGIN, params);
    }

    static async registration(params: IRegistrationParams): Promise<ResponseErrorData> {
        return await apiInstance.post(ENDPOINTS.REGISTRATION, params);
    }

    static async logout(): Promise<void> {
        return await apiInstance.post(ENDPOINTS.LOGOUT, {});
    }

    static async recoveryPassword(params: IRecoveryPasswordParams): Promise<void> {
        return await apiInstance.post(ENDPOINTS.RECOVERY_PASSWORD, params);
    }

    static async recoveryPasswordConfirm(params: IRecoveryPasswordConfirmParams): Promise<void> {
        return await apiInstance.post(ENDPOINTS.RECOVERY_PASSWORD_CONFIRM, params);
    }
}
