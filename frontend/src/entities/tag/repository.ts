import {useQuery} from "@tanstack/react-query";
import {IPaginatorResponse} from "@shared/api";
import {ITaskTag, TagService} from "@entities/tag";

export class TagRepository {
    static keys = {
        root: ["tag"],

        mutation: {
            create: () => [...TagRepository.keys.root, "create"],
            delete: () => [...TagRepository.keys.root, "delete"],
            update: () => [...TagRepository.keys.root, "update"],
        }
    };

    static getList = () => useQuery<
        ITaskTag[],
        Error,
        ITaskTag[],
        string[]
    >({
        queryKey: TagRepository.keys.root,
        queryFn: async () => {
            const response = await TagService.getList();

            await new Promise(resolve => setTimeout(resolve, 500));

            return response.results;
        },
    });
}