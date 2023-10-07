import { ISpaceTaskModel } from "../../../../api/space_task/interface/model";
import { IUserModel } from "../../../../api/user/interface/model";
import { IContextMenuItemConfig } from "../../../context/interface/item";
import { CONTEXT_MENU_TYPE } from "../../../context/interface/menu";
import { ContextMenu } from "../../../context/menu";
import { IViewTableResponsibles } from "../interface/responsibles";
import { ViewTableTask } from "./task";
import { ViewTableTaskCell } from "./task_cell";
import { ViewTableTrait } from "./trait";

export class ViewTableResponsibles extends ViewTableTaskCell implements IViewTableResponsibles {
    img_add: JQuery<HTMLElement>;

    constructor(row: ViewTableTask) {
        super(row, "responsibles");

        this.img_add = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_new",
            src: "/frontend/html/img/plus.svg"
        }).appendTo(this.object);

        let items: IContextMenuItemConfig[] = [{text: "Выберите ответственного:", is_active: false}];
        for(const user of this.row.table.staff_list) {
            items.push({
                text: user.username,
                color: "#EEEEEE",
                is_active: true,
                callback: async (): Promise<boolean> => {
                    if((this.row.data as ISpaceTaskModel).responsibles.map(obj => obj.id).indexOf(user.id) != -1 ||
                    !this.row.onResponsiblesAdd((this.row.data as ISpaceTaskModel).responsibles.map(obj => obj.id).concat(user.id))) 
                        return false;

                    (this.row.data as ISpaceTaskModel).responsibles.push(user);
                    this.addTrait(user);

                    return true;
                },
            });
        }

        this.img_add.on("click", (e) => {
            new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.TAGS, items);
        });

        for(const user of (this.row.data as ISpaceTaskModel).responsibles) {
            this.addTrait(user);
        }
    }

    addTrait(data: IUserModel): ViewTableResponsibles {
        const trait = new ViewTableTrait({
            color: "#EEEEEE",
            text: data.username,
            is_removable: true,
            onRemove: async () => {
                if(!this.row.onResponsiblesRemove((this.row.data as ISpaceTaskModel).responsibles.filter(obj => obj.id != data.id).map(obj => obj.id))) return false;

                (this.row.data as ISpaceTaskModel).responsibles = (this.row.data as ISpaceTaskModel).responsibles.filter(obj => obj.id != data.id);

                return true;
            }
        });

        trait.object.insertBefore(this.img_add);

        return this;
    }

}