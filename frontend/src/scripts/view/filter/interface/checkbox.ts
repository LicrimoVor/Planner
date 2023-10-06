import { ViewFilterOptionCheckbox } from "../implement/option_checkbox";

export interface IViewFilterCheckbox {
    /**
     * Объект блока чекбокса
     */
    object: JQuery<HTMLElement>;

    /**
     * Родительский параметр
     */
    option: ViewFilterOptionCheckbox;

    /**
     * Объект чекбокса
     */
    checkbox: JQuery<HTMLElement>;

    /**
     * Объект текста
     */
    label: JQuery<HTMLElement>;
}

export interface IViewFilterCheckboxConfig {
    /**
     * Текст чекбокса
     */
    text: string;

    /**
     * Активен ли чекбокс изначально
     */
    is_active?: boolean;

    /**
     * Callback изменения состояния чекбокса
     * @param is_checked Активен ли чекбокс
     * @returns 
     */
    onChange: (is_checked: boolean) => Promise<boolean>;
}