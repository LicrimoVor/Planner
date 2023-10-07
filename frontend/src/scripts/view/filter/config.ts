
export interface IViewFilterParams {
    /**
     * Название
     */
    search: string;

    /**
     * Статусы
     */
    status: number[];

    /**
     * Теги
     */
    tags: number[];

    /**
     * Ответственные
     */
    responsible?: number[];

    /**
     * Только актуальные задачи
     */
    actual: boolean;

    /**
     * Сортировать по ...
     */
    ordering: string;
}

export const ViewFilterParamsDefault: IViewFilterParams = {
    search: "",
    status: [],
    tags: [],
    actual: false,
    ordering: "",
    responsible: []
};