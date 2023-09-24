
/**
 * Модель менеджера переадресации
 */
export interface IRedirectManager {
    /**
     * Переадресовать пользователя по URL
     * @param url URL переадресации
     */
    redirect(url): void;
}