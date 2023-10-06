import { ViewFilter } from "./filter";
import { ViewFilterOptionInput } from "./option_input";

export class ViewFilterDescription extends ViewFilterOptionInput {
    constructor(container: ViewFilter, change_callback: (value: string) => Promise<boolean>) {
        super(container, "Поиск по описанию:", "Введите часть текста...", change_callback);
    }
}