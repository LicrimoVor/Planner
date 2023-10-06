
/**
 * Модель менеджера переадресации
 */
export interface IRedirectManager {
    /**
     * Переадресовать пользователя по URL
     * @param url URL переадресации
     * @param params Параметры в заголовке (необязательно)
     */
    redirect(url: string, params?: string): void;

    /**
     * Возвращает текущий URL
     */
    get(): string;

    /**
     * Формирует относительный URL
     * @param url URL адрес
     */
    getUrl(url: string): string;
}