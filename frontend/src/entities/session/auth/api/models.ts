export interface ILoginParams {
    login: string;
    password: string;
}

export interface IRegistrationParams {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface IRegistrationResponse {

}

export interface IRecoveryPasswordParams {
    email: string;
}

export interface IRecoveryPasswordConfirmParams {
    uid: string;
    token: string;
    new_password: string;
}