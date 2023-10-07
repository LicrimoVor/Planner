const SERVER_NAME = "https://digitalplaner.ddns.net";
const API_URL_PATH = "api";
/**
 * Формирует полный адрес запроса из относительных ссылок.
 * @param url URL запроса
 * @returns Полный адрес запроса
 */
export function getApiUrl(url) {
    return `${SERVER_NAME}/${API_URL_PATH}/${url}`;
}
/**
 * Возвращает массив параметров из URL
 * @returns Массив параметров URL
 */
export function getParamsFromUrl() {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const entries = new URLSearchParams(params).entries();
    const array = Array.from(entries);
    return array;
}
/**
 * Возвращает значение конкретного параметра из URL
 * @returns Искомый параметр
 */
export function getParamFromUrl(key) {
    for (const param of getParamsFromUrl()) {
        if (param[0] == key)
            return param[1];
    }
}
