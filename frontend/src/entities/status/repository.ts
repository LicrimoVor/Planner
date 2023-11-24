import {useQuery} from "@tanstack/react-query";
import {IPaginatorResponse} from "@shared/api";
import {ITaskStatus, StatusService} from "@entities/status/api";

export class StatusRepository {
    static keys = {
        root: ["status"],

        mutation: {
            create: () => [...StatusRepository.keys.root, "create"],
            delete: () => [...StatusRepository.keys.root, "delete"],
            update: () => [...StatusRepository.keys.root, "update"],
        }
    };

    static getList = () => useQuery<
        ITaskStatus[],
        Error,
        ITaskStatus[],
        string[]
    >({
        queryKey: StatusRepository.keys.root,
        queryFn: async () => {
            const response = await StatusService.getList();

            await new Promise(resolve => setTimeout(resolve, 500));

            return response.results;
        },
    });
}