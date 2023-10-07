export class LoadingCircle {
    constructor() {
        this.object = $(".loading");
    }
    show() {
        if (!this.object)
            return;
        this.object.toggleClass("loading_show", true);
    }
    hide() {
        if (!this.object)
            return;
        this.object.toggleClass("loading_show", false);
    }
}
