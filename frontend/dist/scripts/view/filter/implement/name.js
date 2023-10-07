import { ViewFilterOptionInput } from "./option_input.js";
export class ViewFilterName extends ViewFilterOptionInput {
    constructor(container, change_callback) {
        super(container, "Поиск по названию:", "Введите название...", change_callback);
    }
}
