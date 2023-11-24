import {Validator, ValidationResult, GetValidator} from "./models";

export class CommonValidator {
    static async validate<T>(
        value: T,
        validators: Validator<T>[]
    ): Promise<ValidationResult> {
        let validationResult: ValidationResult = null;
        let i = 0;

        while(validationResult === null && i < validators.length) {
            const result = await validators[i](value);

            result && (validationResult = result);
            i++;
        }

        return validationResult;
    }

    static required: GetValidator<string, string> = (
        message = "Поле обязательно"
    ) => {
        return async (value) => (value ? null : message);
    }

    static specialChars: GetValidator<string, string> = (
        message = "Содержатся недопустимые символы"
    ) => {
        const regex = /[\\]|(<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>)/;
        return async (value) => (
            regex.test(value) ? message : null
        );
    }

    static maxLength: GetValidator<number, string> = (
        maxLength = 255
    ) => {
        return async (value) => (
            value.length > maxLength ? `Не должно быть больше ${maxLength} символов` : null
        );
    }

    static isEqualTo:
        GetValidator<{
            equalTo: string;
            message: string;
            reverse?: boolean;
        }, string> = (options) => {
        return async (value) => (
            ((!options?.reverse && value === options?.equalTo) ||
            (options?.reverse && value !== options?.equalTo)
            ) ? null : (options?.message || (!options?.reverse ? "Поля должны совпадать" : "Поля не должны совпадать"))
        );
    }
}