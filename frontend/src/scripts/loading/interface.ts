
/**
 * Модель загрузочного круга
 */
export interface ILoadingCircle {
    /**
     * HTML объект загрузочного круга
     */
    object: JQuery;

    /**
     * Показать загрузочный круг
     */
    show(): void;

    /**
     * Скрыть загрузочный круг
     */
    hide(): void;
}