import { IViewFilterOption } from "./option";

export interface IViewFilterOptionSelect extends IViewFilterOption {
    /**
     * Объект селектора
     */
    select: JQuery<HTMLElement>;

    /**
     * Список параметров селектора
     */
    items: JQuery<HTMLElement>[];
}

export interface IViewFilterSelectItemConfig {
    /**
     * Текст параметра
     */
    text: string;

    /**
     * Является ли параметр выбранным по умолчанию
     */
    is_default?: boolean;

    /**
     * Callback выбора параметра
     * @returns 
     */
    onSelect: () => Promise<boolean>;
}