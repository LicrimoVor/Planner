import { ITagModel } from "../../../../api/tag/interface/model";
import { IContextMenuItemConfig } from "../../../context/interface/item";
import { CONTEXT_MENU_TYPE } from "../../../context/interface/menu";
import { ContextMenu } from "../../../context/menu";
import { IViewTableTags } from "../interface/tags";
import { ViewTableTask } from "./task";
import { ViewTableTaskCell } from "./task_cell";
import { ViewTableTrait } from "./trait";

export class ViewTableTags extends ViewTableTaskCell implements IViewTableTags {
    img_add: JQuery<HTMLElement>;

    constructor(row: ViewTableTask) {
        super(row, "tags");

        this.img_add = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_new",
            src: "/frontend/html/img/plus.svg"
        }).appendTo(this.object);

        let items: IContextMenuItemConfig[] = [{text: "Выберите тег:", is_active: false}];
        for(const tag of this.row.table.tags_list) {
            items.push({
                text: tag.name,
                color: tag.color,
                is_active: true,
                callback: async (): Promise<boolean> => {
                    if(this.row.data.tags.map(obj => obj.id).indexOf(tag.id) != -1 ||
                    !this.row.onTagAdd(this.row.data.tags.map(obj => obj.id).concat(tag.id))) 
                        return false;

                    this.row.data.tags.push(tag);
                    this.addTrait(tag);

                    return true;
                },
            });
        }

        this.img_add.on("click", (e) => {
            new ContextMenu(e.pageX, e.pageY, CONTEXT_MENU_TYPE.TAGS, items);
        });

        for(const tag of this.row.data.tags) {
            this.addTrait(tag);
        }
    }

    addTrait(data: ITagModel): ViewTableTags {
        const trait = new ViewTableTrait({
            color: data.color,
            text: data.name,
            is_removable: true,
            onRemove: async () => {
                if(!this.row.onTagRemove(this.row.data.tags.filter(obj => obj.id != data.id).map(obj => obj.id))) return false;

                this.row.data.tags = this.row.data.tags.filter(obj => obj.id != data.id);

                return true;
            }
        });

        trait.object.insertBefore(this.img_add);

        return this;
    }

}