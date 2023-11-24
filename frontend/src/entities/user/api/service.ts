import {IProfile, ITelegramResponse, IUser, UserPasswordDto, UserUpdateDto} from "@entities/user";
import {apiInstance, IPaginatorResponse, ResponseErrorData} from "@shared/api";
import {ISpace} from "@entities/space";

const BASE_URL = "users/";

const ENDPOINTS = {
    ROOT: `${BASE_URL}`,
    ME: {
        ROOT: () => `${ENDPOINTS.ROOT}me/`,
        PROFILE: () => `${ENDPOINTS.ME.ROOT()}profile/`
    },
    PASSWORD: () => `${ENDPOINTS.ROOT}set_password/`,
    SEARCH: (text: string) => ENDPOINTS.ROOT + `search/${text}/`,

    TELEGRAM: {
        ROOT: `telegram/`,
    }
}

export class UserService {
    static async getMe(): Promise<IProfile> {
        return await apiInstance.get(ENDPOINTS.ME.PROFILE());
    }

    static async getAll(): Promise<IPaginatorResponse<IUser>> {
        return await apiInstance.get(ENDPOINTS.ROOT);
    }

    static async update(profile: UserUpdateDto): Promise<IProfile> {
        return await apiInstance.patch(ENDPOINTS.ME.PROFILE(), profile)
    }

    static async setPassword(passwordDto: UserPasswordDto): Promise<ResponseErrorData> {
        return await apiInstance.post(ENDPOINTS.PASSWORD(), passwordDto);
    }

    static async getTelegram(): Promise<ITelegramResponse> {
        return await apiInstance.get(ENDPOINTS.TELEGRAM.ROOT);
    }

    static async search(text: string): Promise<IPaginatorResponse<IUser>> {
        return await apiInstance.get(ENDPOINTS.SEARCH(text));
    }
}