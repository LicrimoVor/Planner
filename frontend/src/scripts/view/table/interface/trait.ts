import { ViewTableTrait } from "../implement/trait";

export interface IViewTableTrait {
    /**
     * Объект свойства
     */
    object: JQuery<HTMLElement>;

    /**
     * Название свойства
     */
    label: JQuery<HTMLElement>;

    /**
     * Кнопка "Удалить" (необязательно)
     */
    img_remove?: JQuery<HTMLElement>;

    /**
     * Callback удаления свойства
     * @returns Обязательно возвращать true в случае успеха, иначе - false!!!
     */
    onRemove?: () => Promise<boolean>;

    /**
     * Изменить данные свойства
     * @param new_data Новые данные свойства
     */
    setData(new_data: IViewTableTraitConfig): ViewTableTrait;
}

export interface IViewTableTraitConfig {
    /**
     * Цвет свойства
     */
    color: string;

    /**
     * Текст свойства
     */
    text: string;

    /**
     * Может ли быть удалено
     */
    is_removable?: boolean;

    /**
     * Callback удаления
     */
    onRemove?: () => Promise<boolean>;
}