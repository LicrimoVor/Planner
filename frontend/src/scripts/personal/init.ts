import { PersonalTaskAPI } from "../../api/personal_task/init";
import { StatusAPI } from "../../api/status/init";
import { TagAPI } from "../../api/tag/init";
import { createFilterMenu, getFilterParams } from "../view/filter/init";
import { createViewTable, updateViewTable } from "../view/table/init";

$(async function() {
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