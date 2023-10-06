
/**
 * Модель конфигурации AJAX-запроса.
 */
export interface IAjaxConfig {
    /**
     * URL запроса
     */
    url: string;

    /**
     * Массив входных данных
     */
    data?: {};

    /**
     * Токен авторизации
     */
    token?: string;
}

/**
 * Модель AJAX функционала.
 */
export interface IAjax {
    /**
     * GET-запрос
     * @param config Конфигурация запроса
     */
    get(config: IAjaxConfig): any;

    /**
     * POST-запрос
     * @param config Конфигурация запроса
     */
    post(config: IAjaxConfig): any;

    /**
     * DELETE-запрос
     * @param config Конфигурация запроса
     */
    delete(config: IAjaxConfig): any;

    /**
     * PUT-запрос
     * @param config Конфигурация запроса
     */
    put(config: IAjaxConfig): any;

    /**
     * PATCH-запрос
     * @param config Конфигурация запроса
     */
    patch(config: IAjaxConfig): any;
}