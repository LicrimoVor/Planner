import { ITagModel } from "../../../../api/tag/interface/model";
import { IViewTableCell, ViewTableCell } from "./cell";
import { ViewTableRow } from "./row";

export interface IViewTableCellTags extends IViewTableCell {
    /**
     * Массив объектов тега
     */
    array: JQuery<HTMLElement>[];
    
    /**
     * Кнопка "Добавить"
     */
    img_add: JQuery<HTMLElement>;

    /**
     * Добавляет новый тег
     * @param data Параметры тега
     */
    add(data: ITagModel): ViewTableCellTags;

    /**
     * Удаляет тег
     * @param tag_element Объект тега
     */
    remove(tag_element: JQuery<HTMLElement>): ViewTableCellTags;
}

export class ViewTableCellTags extends ViewTableCell implements IViewTableCellTags {
    array: JQuery<HTMLElement>[] = [];
    img_add: JQuery<HTMLElement>;

    constructor(row: ViewTableRow, array?: ITagModel[]) {
        super(row);
        this.object.addClass("task-table-cell_tags");

        this.img_add = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_new",
            src: "/frontend/html/img/plus.svg"
        }).appendTo(this.object);

        if(array) {
            for(const tag of array) {
                this.add(tag);
            }
        }
    }

    add(data: ITagModel): ViewTableCellTags {
        const tag_element = $("<p>", {
            class: "trait",
            html: data.name,
            css: {"--trait-bg-color": data.color}
        });
        tag_element.insertBefore(this.img_add);
        this.array.push(tag_element);
        return this;
    }

    remove(tag_element: JQuery<HTMLElement>): ViewTableCellTags {
        this.array = this.array.filter(obj => obj != tag_element);
        tag_element.remove();
        return this;
    }
}