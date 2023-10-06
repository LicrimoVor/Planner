
/**
 * Модель свойства (для статуса и тега)
 */
export interface ITraitModel {
    /**
     * Идентификатор
     */
    id: number;

    /**
     * Какой то слаг на молодежном, я не понял
     */
    slug: string;

    /**
     * Название
     */
    name: string;

    /**
     * HEX цвет
     */
    color: string;
}