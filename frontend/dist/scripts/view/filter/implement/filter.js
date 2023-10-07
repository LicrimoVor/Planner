import { ViewFilterActual } from "./actual.js";
import { ViewFilterDescription } from "./description.js";
import { ViewFilterName } from "./name.js";
import { ViewFilterResponsibles } from "./responsibles.js";
import { ViewFilterSortBy } from "./sort_by.js";
import { ViewFilterStatus } from "./status.js";
import { ViewFilterTags } from "./tags.js";
export class ViewFilter {
    constructor(data) {
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
        if (data.staff_list)
            this.responsibles = new ViewFilterResponsibles(this, data.staff_list);
        this.actual = new ViewFilterActual(this, data.onActualChange);
        this.sort_by = new ViewFilterSortBy(this, data.sort_by_list);
    }
}
