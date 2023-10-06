import { ViewFilterCheckbox } from "../implement/checkbox";
import { IViewFilterOption } from "./option";

export interface IViewFilterOptionCheckbox extends IViewFilterOption {
    /**
     * Массив чекбоксов
     */
    checkbox_list: ViewFilterCheckbox[];
}