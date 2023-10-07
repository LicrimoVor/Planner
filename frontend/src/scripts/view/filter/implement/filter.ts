import { IViewFilter, IViewFilterConfig } from "../interface/filter";
import { ViewFilterActual } from "./actual";
import { ViewFilterDescription } from "./description";
import { ViewFilterName } from "./name";
import { ViewFilterResponsibles } from "./responsibles";
import { ViewFilterSortBy } from "./sort_by";
import { ViewFilterStatus } from "./status";
import { ViewFilterTags } from "./tags";

export class ViewFilter implements IViewFilter {
    object: JQuery<HTMLElement>;
    title: JQuery<HTMLElement>;
    name: ViewFilterName;
    description: ViewFilterDescription;
    status: ViewFilterStatus;
    tags: ViewFilterTags;
    responsibles: ViewFilterResponsibles;
    actual: ViewFilterActual;
    sort_by: ViewFilterSortBy;

    constructor(data: IViewFilterConfig) {
        this.object = $("<div>", {
            class: "task-filter"
        }).appendTo(".task-wrapper");

        this.title = $("<p>", {
            class: "task-filter__title",
            html: "Фильтрация задач"
        }).appendTo(this.object);

        this.name = new ViewFilterName(this, data.onNameChange);
        this.description = new ViewFilterDescription(this, data.onDescriptionChange);
        this.status = new ViewFilterStatus(this, data.status_list);
        this.tags = new ViewFilterTags(this, data.tags_list);
        if(data.staff_list)
            this.responsibles = new ViewFilterResponsibles(this, data.staff_list);
        this.actual = new ViewFilterActual(this, data.onActualChange);
        this.sort_by = new ViewFilterSortBy(this, data.sort_by_list);
    }
}