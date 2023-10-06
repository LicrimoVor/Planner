import { ContextMenu } from "../menu";

export interface IContextMenuItemConfig {
    /**
     * Заголовок пункта
     */
    text: string;

    /**
     * URL иконки (необязательно)
     */
    icon_url?: string;

    /**
     * Цвет пункта (для статусов и тегов)
     */
    color?: string;

    /**
     * Является ли пункт активным (можно нажать).
     */
    is_active?: boolean;

    /**
     * Callback функция для активных пунктов
     */
    callback?(): Promise<boolean>;
}

export interface IContextMenuItem {
    /**
     * Объект пункта меню
     */
    object: JQuery<HTMLElement>;

    /**
     * Родительское меню
     */
    menu: ContextMenu;

    /**
     * Текст пункта
     */
    label: JQuery<HTMLElement>;

    /**
     * Иконка (при наличии)
     */
    icon?: JQuery<HTMLElement>;
}