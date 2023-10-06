import { ViewTableCell } from "./cell";
import { ViewTableTask } from "./task";

export class ViewTableTaskCell extends ViewTableCell {
    row: ViewTableTask;

    constructor(row: ViewTableTask, key_name: string) {
        super(row, key_name);
    }
}