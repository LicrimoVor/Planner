import { IStatusModel } from "../../../../api/status/interface/model";
import { IViewTableCell, ViewTableCell } from "./cell";
import { ViewTableRow } from "./row";

export interface IViewTableCellStatus extends IViewTableCell {
    /**
     * Объект статуса
     */
    status: JQuery<HTMLElement>;

    /**
     * Обновляет статус
     * @param data Параметры статуса
     */
    update(data: IStatusModel): ViewTableCellStatus;
}

export class ViewTableCellStatus extends ViewTableCell implements IViewTableCellStatus {
    status: JQuery<HTMLElement>;

    constructor(row: ViewTableRow, data: IStatusModel = {name: "", color: "transparent"} as IStatusModel) {
        super(row);
        this.object.addClass("task-table-cell_status");

        if(!data) return;

        this.update(data);
    }

    update(data: IStatusModel): ViewTableCellStatus {
        if(!this.status) {
            this.status = $("<p>", {
                class: "trait",
                html: data.name,
                css: {"--trait-bg-color": data.color, display: "none"}
            }).appendTo(this.object);
            $().appendTo;
            this.status.show(50);
        }
        else
            this.status.html(data.name).css("--trait-bg-color", data.color);
        return this;
    }
}