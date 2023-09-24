
/**
 * Модель клиента (текущего пользователя).
 */
export interface IClient {
    /**
     * Формирование токена авторизации для заголовка Authorization
     */
    getToken(): string;

    /**
     * Изменяет текущий токен авторизации в локальном хранилище
     * @param new_token Новый токен авторизации
     */
    setToken(new_token: string): void;

    /**
     * Очищает токен из локального хранилища
     */
    clearToken(): void;
}