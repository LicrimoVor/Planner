import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {IPaginatorResponse} from "@shared/api";
import {IPersonalTask, ISpaceTask, PersonalTaskService, SpaceTaskService, UpdateTaskProps} from "@entities/task";

export class SpaceTaskRepository {
    static keys = {
        root: (spaceId: number) => ["spaceTasks", spaceId],
        task: {
            root: (spaceId: number) => [...SpaceTaskRepository.keys.root(spaceId), "task"],
            id: (spaceId: number, taskId: number) => [...SpaceTaskRepository.keys.task.root(spaceId), taskId],
        },

        mutation: {
            create: (spaceId: number) => [...SpaceTaskRepository.keys.root(spaceId), "create"],
            delete: (spaceId: number) => [...SpaceTaskRepository.keys.root(spaceId), "delete"],
            update: (spaceId: number) => [...SpaceTaskRepository.keys.root(spaceId), "update"],
        }
    }

    static getList = (spaceId: number, params?: string) => useQuery <
        IPaginatorResponse<ISpaceTask>,
        Error
    >({
        queryKey: SpaceTaskRepository.keys.root(spaceId),
        queryFn: async () => {
            const response = await SpaceTaskService.getList(spaceId, params);

            await new Promise(resolve => setTimeout(resolve, 500));

            return response;
        },
    });

    static updateTask = (spaceId: number, queryClient: QueryClient) => useMutation<
        ISpaceTask,
        Error,
        UpdateTaskProps<ISpaceTask<number, number, number>>,
        unknown
        >({
        mutationKey: SpaceTaskRepository.keys.mutation.update(spaceId),
        mutationFn: async ({taskId, task}) => {
            const response = await SpaceTaskService.updateTask(spaceId, taskId, task);

            return response;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: SpaceTaskRepository.keys.root(spaceId)
            });
        },
    });

    static createTask = (spaceId: number, queryClient: QueryClient) => useMutation<
        ISpaceTask,
        Error,
        Partial<ISpaceTask<number, number, number>>
    >({
        mutationKey: SpaceTaskRepository.keys.mutation.create(spaceId),
        mutationFn: async (task) => {
            const response = await SpaceTaskService.createTask(spaceId, task);

            return response;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: SpaceTaskRepository.keys.root(spaceId)
            });
        },
    });

    static deleteTask = (spaceId: number, queryClient: QueryClient) => useMutation<
        void,
        Error,
        number,
        unknown
        >({
        mutationKey: SpaceTaskRepository.keys.mutation.delete(spaceId),
        mutationFn: async (taskId) => {
            const response = await SpaceTaskService.delete(spaceId, taskId);

            return response;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: SpaceTaskRepository.keys.root(spaceId)
            });
        },
    });
}