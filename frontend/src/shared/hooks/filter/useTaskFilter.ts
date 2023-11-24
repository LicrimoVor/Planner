// import {ITask} from "@entities/task";
import {TaskFilter} from "@shared/types";
export function useTaskFilter(props: {
    filters: Partial<TaskFilter>,
}): {
    params: string;
} {
    const {filters} = props;

    const params = "?" + [
        filters.name ?
            `search=${filters.name}` : "",

        filters.status ?
            filters.status!.map(status => `status=${status || ""}`).join("&") : "",

        filters.tags ?
            filters.tags!.map(tag => `tags=${tag || ""}`).join("&") : "",

        filters.actual ?
            `actual=${filters.actual}` : "",
    ].join("&");

    return {
        params
    };
}