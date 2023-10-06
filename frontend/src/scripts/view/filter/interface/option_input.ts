import { IViewFilterOption } from "./option";

export interface IViewFilterOptionInput extends IViewFilterOption {
    /**
     * Объект поля ввода
     */
    input: JQuery<HTMLElement>;
}