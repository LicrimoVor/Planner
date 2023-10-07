import { getParamFromUrl } from "../../api/config";
import { SpaceAPI } from "../../api/space/init";
import { ISpaceModel } from "../../api/space/interface/model";
import { SpaceTaskAPI } from "../../api/space_task/init";
import { StatusAPI } from "../../api/status/init";
import { TagAPI } from "../../api/tag/init";
import { UserAPI } from "../../api/user/init";
import { IUserModel } from "../../api/user/interface/model";
import { createFilterMenu, getFilterParams } from "../view/filter/init";
import { createViewTable, updateViewTable } from "../view/table/init";

const space_id = parseInt(getParamFromUrl("id"));

$(async function() {
    const user = await UserAPI.getMe() as IUserModel;
    const space = await SpaceAPI.getByID(space_id) as ISpaceModel;

    const status_list = await StatusAPI.getList();
    const tags_list = await TagAPI.getList();

    createViewTable(status_list, tags_list, space_id, user.id, space.staff);
    createFilterMenu(status_list, tags_list, async () => {
        updateTable();

        return true;
    }, space.staff);

    updateTable();
});

async function updateTable() {
    updateViewTable((await SpaceTaskAPI.getList(space_id, getFilterParams())).results);
}