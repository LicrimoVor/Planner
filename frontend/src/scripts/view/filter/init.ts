import { IStatusModel } from "../../../api/status/interface/model";
import { ITagModel } from "../../../api/tag/interface/model";
import { IViewFilterParams, ViewFilterParamsDefault } from "./config";
import { ViewFilter } from "./implement/filter";
import { IViewFilterCheckboxConfig } from "./interface/checkbox";
import { IViewFilterConfig } from "./interface/filter";

let filter_menu;

let filter_params: IViewFilterParams = ViewFilterParamsDefault;

export function createFilterMenu (status_array: IStatusModel[], tags_array: ITagModel[], onUpdate: () => Promise<boolean>) {
    let status_list: IViewFilterCheckboxConfig[] = [];
    for(const status of status_array) {
        status_list.push({
            text: status.name,

            onChange(is_checked: boolean) {
                if(!is_checked)
                    filter_params.status = filter_params.status.filter(obj => obj != status.id);
                else
                    filter_params.status.push(status.id);

                onUpdate();
            }
        } as IViewFilterCheckboxConfig);
    }

    let tags_list: IViewFilterCheckboxConfig[] = [];
    for(const tag of tags_array) {
        tags_list.push({
            text: tag.name,

            onChange(is_checked: boolean) {
                if(!is_checked)
                    filter_params.tags = filter_params.tags.filter(obj => obj != tag.id);
                else
                    filter_params.tags.push(tag.id);

                onUpdate();
            }
        } as IViewFilterCheckboxConfig);
    }

    filter_menu = new ViewFilter({
        onNameChange(value: string) {
            filter_params.search = value;

            onUpdate();
        },

        onDescriptionChange(value: string) {
            console.log(`desc change: ${value}`);
        },

        status_list: status_list,

        tags_list: tags_list,

        onActualChange(is_checked: boolean) {
            filter_params.actual = is_checked;

            onUpdate();
        },

        sort_by_list: [
            {
                text: "Дате создания",
                is_default: true,
                onSelect() {
                    filter_params.ordering = "id";

                    onUpdate();
                },
            },
            {
                text: "Дедлайн убывание",
                onSelect() {
                    filter_params.ordering = "deadline";

                    onUpdate();
                },
            },
            {
                text: "Дедлайн возрастание",
                onSelect() {
                    console.log("deadline up");
                },
            }
        ]
    } as IViewFilterConfig);
}

export function getFilterParams(): string {
    let str = "";

    for(const key in filter_params) {
        if(filter_params[key].constructor === Array) {
            for(const obj of filter_params[key]) {
                str += `${key}=${obj}&`;
            }
        }
        else {
            if(!filter_params[key]) continue;

            str += `${key}=${filter_params[key]}&`;
        }
    }

    return str;
}