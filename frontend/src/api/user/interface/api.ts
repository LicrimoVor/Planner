import { IUserModel } from "./model";

/**
 * Модель API пользователя.
 */
export interface IUserAPI {
    /**
     * * GET Запрос
     * 
     * Получение списка пользователей.
     * Используется пагинация.
     * 
     * Response всегда есть
     */
    getList(): Promise<IUserAPI_List>;

    /**
     * * GET Запрос
     * 
     * Получение профиля текущего пользователя.
     * 
     * Возможный Response:
     * 
     * * 200 - OK
     * 
     * * 401 - Пользователь не авторизован
     */
    getMe(): Promise<boolean | IUserModel>;

    /**
     * * GET Запрос
     * 
     * Получение профиля пользователя по ID.
     * Доступно только при авторизации.
     * 
     * Возможный Response:
     * 
     * * 200 - OK
     * 
     * * 401 - Пользователь не авторизован
     * @param id Идентификатор пользователя
     */
    getById(id: number): Promise<boolean | IUserModel>;

    /**
     * * POST Запрос
     * 
     * Получение токена авторизации пользователя по логину и паролю.
     * 
     * Доступно только при авторизации.
     * 
     * Возможный Response:
     * 
     * * 201 - OK
     * 
     * * 400 - Не удалось найти пользователя
     * @param username Имя пользователя
     * @param password Пароль
     */
    getAuthToken(username: string, password: string): Promise<boolean | string>;

    /**
     * * POST Запрос
     * 
     * Удаляет токен авторизации текущего пользователя.
     * 
     * Доступно только при авторизации.
     * 
     * Возможный Response:
     * 
     * * 204 - OK
     * 
     * * 401 - Пользователь не авторизован
     * @param username Имя пользователя
     * @param password Пароль
     */
    removeAuthToken(): Promise<boolean>;

    /**
     * * POST Запрос
     * 
     * Изменение пароля текущего пользователя.
     * 
     * Доступно только при авторизации.
     * 
     * Возможный Response:
     * 
     * * 204 - OK
     * 
     * * 400 - Ошибка валидации параметров
     * 
     * * 401 - Пользователь не авторизован
     * @param current_password Текущий пароль
     * @param new_password Новый пароль
     */
    changePassword(current_password: string, new_password: string): Promise<boolean | Array<string> >;

    /**
     * * POST Запрос
     * 
     * Регистрация нового пользователя.
     * 
     * Возможный Response:
     * 
     * * 201 - OK
     * 
     * * 400 - Ошибка валидации параметров
     * @param data Данные пользователя
     */
    register(data: IUserModel): Promise<boolean | Array<string> >;
}

export interface IUserAPI_List {

    /**
     * Количество пользователей
     */
    count: number;

    /**
     * URL ссылка на следующую страницу списка
     */
    next: string;

    /**
     * URL ссылка на предыдущую страницу списка
     */
    previous: string;

    /**
     * Массив пользователей
     */
    results: Array<IUserModel>;
}