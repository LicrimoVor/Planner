import { StatusAPI } from "./api/status/init";
import { IStatusModel } from "./api/status/interface/model";

$(async function () {
    const result = await StatusAPI.remove(3);

    console.log(result);
});