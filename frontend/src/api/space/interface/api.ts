import { ISpaceModel } from "./model";

export interface ISpaceAPI {
    /**
     * * GET Запрос
     * 
     * Получение списка пространств пользователя.
     * Доступно только при авторизации.
     * 
     * Response всегда есть
     */
    getMy(): Promise<ISpaceModel[]>;

    /**
     * * GET Запрос
     * 
     * Получение пространства по ID.
     * Доступно только при авторизации. Доступно только участникам
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
     * @param id Идентификатор пространства
     */
    getByID(id: number): Promise<boolean | ISpaceModel>;
}