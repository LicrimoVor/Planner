import { IStatusModel } from "../../../../api/status/interface/model";
import { IViewTableCell, ViewTableCell } from "./cell";
import { ViewTableRow } from "./row";

export interface IViewTableCellStatus extends IViewTableCell {
    /**
     * Объект статуса
     */
    status: JQuery<HTMLElement>;

    /**
     * Изменяет параметры статуса (цвет, название)
     * @param data Параметры статуса
     */
    setData(data: IStatusModel): ViewTableCellStatus;
}

export class ViewTableCellStatus extends ViewTableCell implements IViewTableCellStatus {
    status: JQuery<HTMLElement>;

    constructor(row: ViewTableRow, data: IStatusModel = {name: "", color: "transparent"} as IStatusModel) {
        super(row);
        this.object.addClass("task-table-cell_status");

        if(!data) return;

        this.status = $("<p>", {
            class: "trait",
            html: data.name,
            css: {"--trait-bg-color": data.color}
        }).appendTo(this.object);
    }

    setData(data: IStatusModel): ViewTableCellStatus {
        this.status.html(data.name).css("--trait-bg-color", data.color);
        return this;
    }
}