import { IStatusListModel, IStatusModel } from "./model";

export interface IStatusAPI {
    /**
     * * GET Запрос
     * 
     * Получение списка статусов.
     * Используется пагинация.
     * 
     * Response всегда есть
     */
    getList(): Promise<Array<IStatusModel>>;

    /**
     * * GET Запрос
     * 
     * Получение статуса по ID.
     * Доступно только при авторизации.
     * 
     * Возможный Response:
     * 
     * * 200 - OK
     * 
     * * 401 - Пользователь не авторизован
     * 
     * * 404 - Объект не найден
     * @param id Идентификатор статуса
     */
    getByID(id: number): Promise<boolean | IStatusModel>;

    /**
     * * POST Запрос
     * 
     * Создание статуса.
     * 
     * Доступно только при авторизации.
     * 
     * Возможный Response:
     * 
     * * 201 - OK
     * 
     * * 400 - Ошибка валидации параметров
     * 
     * * 401 - Пользователь не авторизован
     * 
     * * 403 - Недостаточно прав
     * @param data Данные статуса
     */
    create(data: IStatusModel): Promise<boolean | Array<string> >;

    /**
     * * DELETE Запрос
     * 
     * Удаляет статус.
     * 
     * Доступно только при авторизации.
     * 
     * Возможный Response:
     * 
     * * 204 - OK
     * 
     * * 401 - Пользователь не авторизован
     * 
     * * 403 - Недостаточно прав
     * 
     * * 404 - Объект не найден
     * @param id Идентификатор статуса
     */
    remove(id: number): Promise<boolean>;

    /**
     * * PUT Запрос
     * 
     * Обновляет информацию о статусе.
     * 
     * Доступно только при авторизации.
     * 
     * Возможный Response:
     * 
     * * 200 - OK
     * 
     * * 401 - Пользователь не авторизован
     * 
     * * 403 - Недостаточно прав
     * 
     * * 404 - Объект не найден
     * @param id Идентификатор статуса
     * @param data Данные статуса
     */
    update(id: number, data: IStatusModel): Promise<boolean>;
}