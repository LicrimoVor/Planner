
export interface IContextMenu {
    /**
     * Объект контекстного меню
     */
    object: JQuery<HTMLElement>;

    /**
     * Тип контекстного меню
     */
    type: string;

    /**
     * Удаление меню
     */
    destroy(): void;
}

export const CONTEXT_MENU_TYPE = {
    DEFAULT: "default",
    STATUS: "status",
    TAGS: "tags"
}