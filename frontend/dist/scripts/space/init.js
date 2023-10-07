import { getParamFromUrl } from "../../api/config.js";
import { SpaceTaskAPI } from "../../api/space_task/init.js";
import { StatusAPI } from "../../api/status/init.js";
import { TagAPI } from "../../api/tag/init.js";
import { UserAPI } from "../../api/user/init.js";
import { createFilterMenu, getFilterParams } from "../view/filter/init.js";
import { createViewTable, updateViewTable } from "../view/table/init.js";
const space_id = parseInt(getParamFromUrl("id"));
$(async function () {
    const user = await UserAPI.getMe();
    const status_list = await StatusAPI.getList();
    const tags_list = await TagAPI.getList();
    createViewTable(status_list, tags_list, space_id, user.id);
    createFilterMenu(status_list, tags_list, async () => {
        updateTable();
        return true;
    });
    updateTable();
});
async function updateTable() {
    updateViewTable((await SpaceTaskAPI.getList(space_id, getFilterParams())).results);
}
