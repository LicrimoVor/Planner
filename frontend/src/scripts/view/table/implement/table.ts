import { IStatusModel } from "../../../../api/status/interface/model";
import { ITagModel } from "../../../../api/tag/interface/model";
import { IViewTable, IViewTableConfig } from "../interface/table";
import { ViewTableAdd } from "./add";
import { ViewTableHeader } from "./header";
import { ViewTableTask } from "./task";

export class ViewTable implements IViewTable {
    object: JQuery<HTMLElement>;
    tasks: ViewTableTask[] = [];
    status_list: IStatusModel[];
    tags_list: ITagModel[];
    is_personal: boolean;
    add: ViewTableAdd;

    onAdd: () => Promise<boolean>;

    constructor(config: IViewTableConfig) {
        this.object = $("<table>", {
            class: "task-table"
        }).appendTo(".task-wrapper");

        this.is_personal = config.is_personal;
        this.status_list = config.status_list;
        this.tags_list = config.tags_list;
        this.onAdd = config.onAdd;

        new ViewTableHeader(this, config.header);

        this.add = new ViewTableAdd(this);
    }

    clear(): ViewTable {
        $.each(this.tasks, function() {
            this.destroy();
        });

        return this;
    }
}