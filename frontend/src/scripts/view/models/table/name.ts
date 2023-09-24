import { IViewTableCell, ViewTableCell } from "./cell";
import { IViewTableRow } from "./row";

export interface IViewTableCellName extends IViewTableCell {
    /**
     * Кнопка "Расширить"
     */
    img_expand: JQuery<HTMLElement>;

    /**
     * Кнопка "Добавить"
     */
    img_add: JQuery<HTMLElement>;

    /**
     * Кнопка "Изменить"
     */
    img_edit: JQuery<HTMLElement>;

    /**
     * Название задачи
     */
    label: JQuery<HTMLElement>;

    /**
     * Ввод названия
     */
    input: JQuery<HTMLElement>;

    /**
     * Массив уровневых отступов
     */
    level_offset: JQuery<HTMLElement>[];

    /**
     * Изменение названия задачи
     * @param name Название задачи
     */
    setText(name?: string): ViewTableCell;

    /**
     * Добавляет (удаляет лишние) уровневые отступ
     * @param depth Уровень отступов (0 - отступа нет, по умолчанию)
     */
    setLevels(depth?: number): ViewTableCell;

    /**
     * Развернута ли задача
     */
    is_expanded: boolean;

    /**
     * Callback при разворачивании задачи
     * @param callback Callback
     * @param args Аргументы
     */
    onExpand(callback: (...any) => Promise<boolean>, ...args: any): ViewTableCell;

    /**
     * Открыть поле ввода
     */
    openInput(): ViewTableCell;

    /**
     * Закрыть поле ввода
     */
    destroyInput(): ViewTableCell;

    /**
     * Callback при изменении текста
     * @param callback Callback
     * @param args Аргументы
     */
    onEnter(callback: (...any) => Promise<boolean>, ...args: any): ViewTableCell;
}

export class ViewTableCellName extends ViewTableCell implements IViewTableCellName {
    img_expand: JQuery<HTMLElement>;
    img_add: JQuery<HTMLElement>;
    img_edit: JQuery<HTMLElement>;
    label: JQuery<HTMLElement>;
    input: JQuery<HTMLElement>;
    level_offset: JQuery<HTMLElement>[] = [];
    is_expanded: boolean;

    constructor(row: IViewTableRow, name: string = "") {
        super(row);
        this.object.addClass("task-table-cell_name");

        this.img_expand = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_expand",
            src: "/frontend/html/img/drop_down.svg"
        }).appendTo(this.object);

        this.img_add = $("<img>", {
            class: "task-table-cell__img task-table-cell__img_new",
            src: "/frontend/html/img/plus.svg"
        }).appendTo(this.object);

        this.label = $("<p>", {
            class: "task-table-cell__label",
            html: name
        }).appendTo(this.object);

        this.label.on("click", () => {
            this.openInput();
        });

        // this.img_edit = $("<img>", {
        //     class: "task-table-cell__img task-table-cell__img_edit",
        //     src: "/frontend/html/img/edit.svg"
        // }).appendTo(this.object);
    }

    setText(name: string = ""): ViewTableCell {
        this.label.html(name);
        return this;
    }

    setLevels(depth: number = 0): ViewTableCell {
        while(this.level_offset.length != depth) {
            if(this.level_offset.length > depth)
                (this.level_offset.pop()).remove();
            else {
                this.level_offset.push(($("<div>", {style: "width: 25px;"})));
                this.object.prepend(this.level_offset[this.level_offset.length - 1]);
            }
        }

        return this;
    }

    onExpand(callback: (...any: any[]) => Promise<boolean>, ...args: any): ViewTableCell {
        this.img_expand.on("click", async () => {
            if(!await callback(...args)) return;
            this.is_expanded = !this.is_expanded;
            this.img_expand.toggleClass("task-table-cell__img_expand_open", this.is_expanded);
        });
        return this;
    }

    openInput(): ViewTableCell {
        if(this.input) return this;
        this.input = $("<input>", {
           class: "task-table-cell__input",
           value: this.label.text()
        });
        this.object.append(this.input);
        this.input.trigger("focus");
        this.input.on("blur", () => {
            this.destroyInput();
        });
        return this;
    }

    destroyInput(): ViewTableCell {
        if(!this.input) return this;
        this.input.remove();
        this.input = null;
        return this;
    }

    onEnter(callback: (...any: any[]) => Promise<boolean>, ...args: any): ViewTableCell {
        // this.img_expand.on("click", async () => {
        //     if(!await callback(...args)) return;
        //     this.is_expanded = !this.is_expanded;
        //     this.img_expand.toggleClass("task-table-cell__img_expand_open", this.is_expanded);
        // });
        return this;
    }
}