import {
    AuthService,
    ILoginParams,
    IRecoveryPasswordConfirmParams,
    IRecoveryPasswordParams,
    IRegistrationParams
} from "./api";
import Cookies from "js-cookie";
import {sessionStore} from "@entities/session";
import {ResponseErrorHandler, ResponseErrorData} from "@shared/api";

export class AuthRepository {
    static login = async (params: ILoginParams) => {
        try {
            await AuthService.login(params);
            const session = Cookies.get("sessionid")!;
            sessionStore.setUser(session);
        }
        catch (error) {
            throw new Error("Неверный логин или пароль");
        }
    };

    static registration = async (params: IRegistrationParams) => {
        try {
            const response = await AuthService.registration(params);
        }
        catch (error: any) {
            throw new ResponseErrorHandler(error as ResponseErrorData);
        }
    };

    static logout = async () => {
        try {
            await AuthService.logout();
            sessionStore.removeUser();
        }
        catch (error) {

        }
    };

    static recoveryPassword = async (params: IRecoveryPasswordParams) => {
        try {
            await AuthService.recoveryPassword(params);
        }
        catch (error) {
            throw new Error("Пользователь с такой почтой не найден");
        }
    };

    static recoveryPasswordConfirm = async (params: IRecoveryPasswordConfirmParams) => {
        try {
            await AuthService.recoveryPasswordConfirm(params);
        }
        catch (error) {
            throw new Error("Произошла ошибка!");
        }
    };
}