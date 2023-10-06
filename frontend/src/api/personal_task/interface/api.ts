import { IPersonalTaskListModel, IPersonalTaskModel } from "./model";

export interface IPersonalTaskAPI {
    /**
     * * GET Запрос
     * 
     * Получение списка персональных задач пользователя.
     * Используется пагинация. Доступно только при авторизации.
     * 
     * Response всегда есть
     */
    getList(filters?: string): Promise<IPersonalTaskListModel>;

    /**
     * * GET Запрос
     * 
     * Получение списка подзадач.
     * Доступно только при авторизации.
     * 
     * Response всегда есть
     * 
     * @param id Идентификатор пользователя
     */
    getSubtaskList(id: number, filters?: string): Promise<Array<IPersonalTaskModel>>;

    /**
     * * GET Запрос
     * 
     * Получение персональной задачи по ID.
     * Доступно только при авторизации.
     * 
     * Возможный Response:
     * 
     * * 200 - OK
     * 
     * * 401 - Пользователь не авторизован
     * 
     * * 404 - Объект не найден
     * @param id Идентификатор пользователя
     */
    getByID(id: number): Promise<IPersonalTaskModel>;

    /**
     * * GET Запрос
     * 
     * Получение списка задач пространств, где пользователь является ответственным.
     * 
     * Используется пагинация.
     * 
     * Response всегда есть
     */
    getFromSpaces(): Promise<IPersonalTaskListModel>;

    /**
     * * POST Запрос
     * 
     * Создание персональной задачи/подзадачи пользователя.
     * 
     * Доступно только при авторизации
     * 
     * Возможный Response:
     * 
     * * 201 - OK
     * 
     * * 400 - Ошибка валидации параметров
     * 
     * * 401 - Пользователь не авторизован
     * @param data Данные задачи
     * @param is_subtask Является ли создаваемый объект подзадачей
     * @param parent_id Идентификатор родительской задачи
     */
    create(data: IPersonalTaskModel, is_subtask?: boolean, parent_id?: number): Promise<IPersonalTaskModel | Array<string> >;
    
    /**
     * * DELETE Запрос
     * 
     * Удаляет персональную задачу/подзадачу и всё её дерво.
     * 
     * Доступно только при авторизации.
     * 
     * Возможный Response:
     * 
     * * 204 - OK
     * 
     * * 401 - Пользователь не авторизован
     * 
     * * 404 - Объект не найден
     * @param id Идентификатор задачи
     */
    remove(id: number): Promise<boolean>;

    /**
     * * PUT Запрос
     * 
     * Обновляет информацию о задаче.
     * 
     * Доступно только при авторизации.
     * 
     * Возможный Response:
     * 
     * * 200 - OK
     * 
     * * 401 - Пользователь не авторизован
     * 
     * * 404 - Объект не найден
     * @param id Идентификатор задачи
     * @param data Данные задачи
     */
    update(id: number, data: IPersonalTaskModel): Promise<boolean>;

    /**
     * * PATCH Запрос
     * 
     * Обновляет ТОЛЬКО ПЕРЕДАННУЮ информацию о задаче.
     * 
     * Доступно только при авторизации.
     * 
     * Возможный Response:
     * 
     * * 200 - OK
     * 
     * * 401 - Пользователь не авторизован
     * 
     * * 404 - Объект не найден
     * @param id Идентификатор задачи
     * @param data Данные задачи
     */
    updateFields(id: number, data: IPersonalTaskModel): Promise<boolean>;

    /**
     * * GET Запрос
     * 
     * Перенос подзадачи в определенную задачу либо перенос на главный уровень
     */
    move(from_id: number, to_id: number): Promise<boolean>;
}