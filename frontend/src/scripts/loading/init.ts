import { ILoadingCircle } from "./interface";

export class LoadingCircle implements ILoadingCircle {
    object: JQuery;

    constructor() {
        this.object = $(".loading");
    }

    show(): void {
        if(!this.object) return;

        this.object.toggleClass("loading_show", true);
    }

    hide(): void {
        if(!this.object) return;

        this.object.toggleClass("loading_show", false);
    }
}