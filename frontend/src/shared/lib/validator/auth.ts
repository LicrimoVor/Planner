import {GetValidator} from "@shared/lib";

export class AuthValidator {
    static username: GetValidator<string, string> = (
        message = "Некорректный логин"
    ) => {
        const regex = /^[\w.@+-]+/;
        return async (value) => (
            !regex.test(value) ? message : null
        );
    }

    static realName: GetValidator<string, string> = (
        message = "Разрешена только кириллица и латинский алфавит"
    ) => {
        const regex = /[^a-zа-яё]/iu;
        return async (value) => (
            regex.test(value) ? message : null
        );
    }
}