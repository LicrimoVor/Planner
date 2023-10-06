import { ISpaceTaskModel } from "../../../../api/space_task/interface/model";
import { IUserModel } from "../../../../api/user/interface/model";
import { IContextMenuItemConfig } from "../../../context/interface/item";
import { CONTEXT_MENU_TYPE } from "../../../context/interface/menu";
import { ContextMenu } from "../../../context/menu";
import { IViewTableResponsible } from "../interface/responsible";
import { ViewTableTask } from "./task";
import { ViewTableTaskCell } from "./task_cell";
import { ViewTableTrait } from "./trait";

export class ViewTableResponsible extends ViewTableTaskCell implements IViewTableResponsible {
    img_add: JQuery<HTMLElement>;

    constructor(row: ViewTableTask) {
        super(row, "responsible");

        this.img_add = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_new",
            src: "/frontend/html/img/plus.svg"
        }).appendTo(this.object);

        let items: IContextMenuItemConfig[] = [{text: "Выберите ответственного:", is_active: false}];
        for(const user of (this.row.data as ISpaceTaskModel).responsible) {
            items.push({
                text: user.username,
                color: "#EEEEEE",
                is_active: true,
                callback: async (): Promise<boolean> => {
                    if((this.row.data as ISpaceTaskModel).responsible.map(obj => obj.id).indexOf(user.id) != -1 ||
                    !this.row.onResponsibleAdd((this.row.data as ISpaceTaskModel).responsible.map(obj => obj.id).concat(user.id))) 
                        return false;

                    (this.row.data as ISpaceTaskModel).responsible.push(user);
                    this.addTrait(user);

                    return true;
                },
            });
        }

        this.img_add.on("click", (e) => {
            new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.TAGS, items);
        });

        for(const user of (this.row.data as ISpaceTaskModel).responsible) {
            this.addTrait(user);
        }
    }

    addTrait(data: IUserModel): ViewTableResponsible {
        const trait = new ViewTableTrait({
            color: "#EEEEEE",
            text: data.username,
            is_removable: true,
            onRemove: async () => {
                if(!this.row.onResponsibleRemove((this.row.data as ISpaceTaskModel).responsible.filter(obj => obj.id != data.id).map(obj => obj.id))) return false;

                (this.row.data as ISpaceTaskModel).responsible = (this.row.data as ISpaceTaskModel).responsible.filter(obj => obj.id != data.id);

                return true;
            }
        });

        trait.object.insertBefore(this.img_add);

        return this;
    }

}