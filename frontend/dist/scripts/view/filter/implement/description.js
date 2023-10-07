import { ViewFilterOptionInput } from "./option_input.js";
export class ViewFilterDescription extends ViewFilterOptionInput {
    constructor(container, change_callback) {
        super(container, "Поиск по описанию:", "Введите часть текста...", change_callback);
    }
}
