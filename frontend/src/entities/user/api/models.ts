
export interface IUser {
    readonly id: number;
    username: string
    first_name: string;
    last_name: string;
    email: string;
    readonly color: string;
}

export interface IProfile {
    readonly user: IUser;
    avatar: string;
    time_zone: number;
    color: string;
}

export type UserUpdateDto = Partial<
    IProfile & IUser
>;

export type UserPasswordDto = {
    current_password: string;
    new_password: string;
};

export interface ITelegramResponse {
    url_telegram: string;
}