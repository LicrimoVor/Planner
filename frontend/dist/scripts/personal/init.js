import { PersonalTaskAPI } from "../../api/personal_task/init.js";
import { StatusAPI } from "../../api/status/init.js";
import { TagAPI } from "../../api/tag/init.js";
import { createFilterMenu, getFilterParams } from "../view/filter/init.js";
import { createViewTable, updateViewTable } from "../view/table/init.js";
$(async function () {
    const status_list = await StatusAPI.getList();
    const tags_list = await TagAPI.getList();
    createViewTable(status_list, tags_list);
    createFilterMenu(status_list, tags_list, async () => {
        updateTable();
        return true;
    });
    updateTable();
});
async function updateTable() {
    updateViewTable((await PersonalTaskAPI.getList(getFilterParams())).results);
}
