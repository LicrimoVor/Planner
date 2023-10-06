
/**
 * Модель пользователя.
 */
export interface IUserModel {
    /**
     * Идентификатор
     */
    id?: number;

    /**
     * Имя пользователя (логин)
     */
    username?: string;

    /**
     * Пароль
     */
    password?: string;

    /**
     * Электронная почта
     */
    email?: string;

    /**
     * Имя
     */
    first_name?: string;

    /**
     * Фамилия
     */
    last_name?: string;

    /**
     * ID пользователя в телеграме
     */
    telegram_id?: number;
}