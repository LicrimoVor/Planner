import { IStatusModel } from "../../../../api/status/interface/model";
import { ViewTableStatus } from "../implement/status";
import { ViewTableTrait } from "../implement/trait";
import { IViewTableCell } from "./cell";

export interface IViewTableStatus extends IViewTableCell {
    /**
     * Объект свойства текущего статуса
     */
    trait: ViewTableTrait;

    /**
     * Создание свойства
     * @param data Данные статуса
     */
    createTrait(data: IStatusModel): ViewTableStatus;

    /**
     * Изменение данных статуса
     * @param new_data Новые данные статуса
     */
    setData(new_data: IStatusModel): ViewTableStatus;
}