import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {IPaginatorResponse} from "@shared/api";
import {ISpace, SpaceService} from "@entities/space";
import {IPersonalTask, ISpaceTask, PersonalTaskService, SpaceTaskService, UpdateTaskProps} from "@entities/task";

export class SpaceRepository {
    static keys = {
        spaces: {
            root: ["spaces"],

            userList: {
                root: () => [...SpaceRepository.keys.spaces.root, "userList"],
            },
        },
        
        space: {
            root: ["space"],

            id: (spaceId: number) => [...SpaceRepository.keys.space.root, spaceId],
        },

        mutation: {
            create: () => [...SpaceRepository.keys.space.root, "create"],
            delete: () => [...SpaceRepository.keys.space.root, "delete"],
            update: () => [...SpaceRepository.keys.space.root, "update"],
        }
    }

    static getMy = (queryClient: QueryClient) => useQuery<
        IPaginatorResponse<ISpace>,
        Error
    >({
        queryKey: SpaceRepository.keys.spaces.userList.root(),

        queryFn: async () => {
            const response = await SpaceService.getMy();

            await new Promise(resolve => setTimeout(resolve, 500));

            return response;
        },

        retry: 3
    });

    static getById = (spaceId: number) => useQuery<
        ISpace,
        Error
    >({
        queryKey: SpaceRepository.keys.space.id(spaceId),

        queryFn: async () => {
            const response = await SpaceService.getById(spaceId);

            await new Promise(resolve => setTimeout(resolve, 500));


            return response;
        },

        retry: 3
    });

    static create = async (task: Partial<ISpace<number>>): Promise<ISpace> => {
        try {
            const response = await SpaceService.create(task);

            return response;
        }
        catch {
            throw new Error("Произошла ошибка при создании");
        }
    };

    static update = (spaceId: number, queryClient: QueryClient) => useMutation<
        ISpace,
        Error,
        Partial<ISpace<number>>,
        unknown
        >({
        mutationKey: SpaceRepository.keys.mutation.update(),
        mutationFn: async (space) => {
            const response = await SpaceService.update(spaceId, space);

            return response;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: SpaceRepository.keys.space.id(spaceId)
            });
        },
    });
}