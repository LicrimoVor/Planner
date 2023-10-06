import { ViewFilter } from "./filter";
import { ViewFilterOptionInput } from "./option_input";

export class ViewFilterName extends ViewFilterOptionInput {
    constructor(container: ViewFilter, change_callback: (value: string) => Promise<boolean>) {
        super(container, "Поиск по названию:", "Введите название...", change_callback);
    }
}