import { IStatusModel } from "../../../../api/status/interface/model";
import { IContextMenuItemConfig } from "../../../context/interface/item";
import { CONTEXT_MENU_TYPE } from "../../../context/interface/menu";
import { ContextMenu } from "../../../context/menu";
import { IViewTableStatus } from "../interface/status";
import { IViewTableTraitConfig } from "../interface/trait";
import { ViewTableTask } from "./task";
import { ViewTableTaskCell } from "./task_cell";
import { ViewTableTrait } from "./trait";

export class ViewTableStatus extends ViewTableTaskCell implements IViewTableStatus {
    trait: ViewTableTrait;

    constructor(row: ViewTableTask) {
        super(row, "status");

        let items: IContextMenuItemConfig[] = [{text: "Выберите статус:", is_active: false}];
        for(const status of this.row.table.status_list) {
            items.push({
                text: status.name,
                color: status.color,
                is_active: true,
                callback: async (): Promise<boolean> => {
                    if(!this.row.onStatusChange(status.id)) return false;

                    this.setData(status);

                    return true;
                },
            });
        }

        this.object.on("click", (e) => {
            new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.STATUS, items);
        });

        if(this.row.data.status)
            this.createTrait(this.row.data.status);
    }

    createTrait(data: IStatusModel): ViewTableStatus {
        this.trait = new ViewTableTrait({
            color: data.color,
            text: data.name,
            is_removable: false
        });
        this.trait.object.appendTo(this.object);

        return this;
    }

    setData(new_data: IStatusModel): ViewTableStatus {
        this.row.data.status = new_data;

        if(!this.trait)
            return this.createTrait(new_data);

        this.trait.setData({
            color: new_data.color,
            text: new_data.name
        });

        return this;
    }
}