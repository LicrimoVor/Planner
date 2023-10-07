export class ViewTableTrait {
    constructor(data) {
        this.object = $("<div>", {
            class: "trait",
            css: { "--trait-color": data.color }
        });
        this.label = $("<p>", {
            class: "trait__label",
            html: data.text
        }).appendTo(this.object);
        if (data.is_removable) {
            this.img_remove = $("<img>", {
                class: "trait__remove",
                src: "/frontend/html/img/backspace.svg"
            }).appendTo(this.object);
            this.onRemove = data.onRemove;
            if (this.onRemove) {
                this.img_remove.on("click", () => {
                    if (!this.onRemove())
                        return;
                    this.object.remove();
                });
            }
        }
    }
    setData(new_data) {
        this.object.css("--trait-color", new_data.color);
        this.label.html(new_data.text);
        return this;
    }
}
