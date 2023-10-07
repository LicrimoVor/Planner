import { IPersonalTaskModel } from "../../../../api/personal_task/interface/model";
import { ISpaceTaskModel } from "../../../../api/space_task/interface/model";
import { ITaskModel } from "../../../../api/task/interface";
import { ViewTableDeadline } from "../implement/deadline";
import { ViewTableDescription } from "../implement/description";
import { ViewTableName } from "../implement/name";
import { ViewTableResponsibles } from "../implement/responsibles";
import { ViewTableStatus } from "../implement/status";
import { ViewTableTags } from "../implement/tags";
import { ViewTableTask } from "../implement/task";
import { IViewTableRow } from "./row";

export interface IViewTableTask extends IViewTableRow {
    /**
     * Информация о задаче
     */
    data: IPersonalTaskModel | ISpaceTaskModel;

    /**
     * Уровень задачи
     */
    depth: number;

    /**
     * Родитель подзадачи
     */
    parent: ViewTableTask;

    /**
     * Рвскрыта ли задача
     */
    is_expanded: boolean;

    /**
     * Перемещается ли задача
     */
    is_hovered: boolean;



    /**
     * Ячейка названия
     */
    name?: ViewTableName;

    /**
     * Ячейка статуса
     */
    status?: ViewTableStatus;

    /**
     * Ячейка с тегами
     */
    tags?: ViewTableTags;

    /**
     * Ячейка с ответственными
     */
    responsibles?: ViewTableResponsibles;

    /**
     * Ячейка дедлайна
     */
    deadline?: ViewTableDeadline;

    /**
     * Ячейка описания
     */
    description?: ViewTableDescription;


    /**
     * Callback изменения названия
     * @param value Название задачи
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onNameChange: (value: string) => Promise<boolean>;

    /**
     * Callback раскрытия/скрытия задачи
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onExpand: () => Promise<boolean>;

    /**
     * Callback создания подзадачи
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onAddSubtask: () => Promise<boolean>;

    /**
     * Callback изменения статуса
     * @param status_id Идентификатор статуса
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onStatusChange: (status_id: number) => Promise<boolean>;

    /**
     * Callback добавление тега
     * @param tags Массив из ID тегов
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onTagAdd: (tags: number[]) => Promise<boolean>;

    /**
     * Callback удаления тега
     * @param tags Массив из ID тегов
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onTagRemove: (tags: number[]) => Promise<boolean>;

    /**
     * Callback добавление тега
     * @param users Массив из ID пользователей
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onResponsiblesAdd: (users: number[]) => Promise<boolean>;

    /**
     * Callback удаления тега
     * @param users Массив из ID пользователей
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onResponsiblesRemove: (users: number[]) => Promise<boolean>;

    /**
     * Callback изменения дедлайна
     * @param deadline Timestamp дедлайна
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onDeadlineChange: (deadline: number) => Promise<boolean>;

    /**
     * Callback изменения описания
     * @param value Описание задачи
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onDescriptionChange: (value: string) => Promise<boolean>;

    /**
     * Callback перемещения задачи
     * @param parent Родительская строка
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onAttach: (parent?: ViewTableTask) => Promise<boolean>;

    /**
     * Callback удаления всего дерева задачи
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onRemove: () => Promise<boolean>;



    /**
     * Изменить уровень задачи
     * @param depth Новый уровень
     */
    setLevel?(depth: number): ViewTableTask;

    /**
     * Удалить задачу и все её подзадачи
     */
    destroy(): void;

    /**
     * Раскрыть/скрыть задачу
     * @param is_phantom Если нет, то никакие запросы и создания не делаются, а лишь меняется состояние развернутости
     */
    expand(is_phantom: boolean): Promise<void>;
}

// Практически копи-паст интерфейса строки задачи, см. выше
export interface IViewTableTaskConfig {
    data: IPersonalTaskModel | ISpaceTaskModel;

    depth: number;

    parent: ViewTableTask;

    onNameChange: (value: string) => Promise<boolean>;

    onExpand: () => Promise<boolean>;

    onAddSubtask: () => Promise<boolean>;

    onStatusChange: (status_id: number) => Promise<boolean>;

    onTagAdd: (tags: number[]) => Promise<boolean>;

    onTagRemove: (tags: number[]) => Promise<boolean>;

    onResponsiblesAdd?: (tags: number[]) => Promise<boolean>;

    onResponsiblesRemove?: (tags: number[]) => Promise<boolean>;

    onDeadlineChange: (deadline: number) => Promise<boolean>;

    onDescriptionChange: (value: string) => Promise<boolean>;

    onAttach: (parent?: ViewTableTask) => Promise<boolean>;

    onRemove: () => Promise<boolean>;
}