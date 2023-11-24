import {IPersonalTask, PersonalTaskService, UpdateTaskProps} from "@entities/task";
import {QueryClient, useMutation, useQuery} from "@tanstack/react-query";
import {IPaginatorResponse} from "@shared/api";

export class PersonalTaskRepository {
    static keys = {
        root: ["personalTasks"],
        task: {
            root: () => [...PersonalTaskRepository.keys.root, "task"],
            id: (id: number) => [...PersonalTaskRepository.keys.task.root(), id],
        },

        mutation: {
            create: () => [...PersonalTaskRepository.keys.root, "create"],
            delete: () => [...PersonalTaskRepository.keys.root, "delete"],
            update: () => [...PersonalTaskRepository.keys.root, "update"],
        }

    }

    static getList = (params?: string) => useQuery <
        IPaginatorResponse<IPersonalTask>,
        Error,
        IPaginatorResponse<IPersonalTask>,
        string[]
    >({
        queryKey: PersonalTaskRepository.keys.root,
        queryFn: async () => {
            const response = await PersonalTaskService.getList(params);

            await new Promise(resolve => setTimeout(resolve, 500));

            return response;
        },
    });

    static updateTask = (queryClient: QueryClient) => useMutation<
        IPersonalTask,
        Error,
        UpdateTaskProps<IPersonalTask<number, number>>,
        unknown
    >({
        mutationKey: PersonalTaskRepository.keys.mutation.update(),
        mutationFn: async ({taskId, task}) => {
            const response = await PersonalTaskService.updateTask(taskId, task);

            return response;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: PersonalTaskRepository.keys.root
            });
        },
    });

    static createTask = (queryClient: QueryClient) => useMutation<
        IPersonalTask,
        Error,
        Partial<IPersonalTask<number, number>>,
        unknown
        >({
        mutationKey: PersonalTaskRepository.keys.mutation.create(),
        mutationFn: async (task) => {
            const response = await PersonalTaskService.create(task);

            return response;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: PersonalTaskRepository.keys.root
            });
        },
    });

    static deleteTask = (queryClient: QueryClient) => useMutation<
        void,
        Error,
        number,
        unknown
        >({
        mutationKey: PersonalTaskRepository.keys.mutation.delete(),
        mutationFn: async (taskId) => {
            const response = await PersonalTaskService.delete(taskId);

            return response;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: PersonalTaskRepository.keys.root
            });
        },
    });

    static getSubtasks = (task_id: number) => useQuery <
        IPaginatorResponse<IPersonalTask>,
        Error,
        IPaginatorResponse<IPersonalTask>,
        string[]
    >({
        queryKey: ["dasdas"],
        queryFn: async () => {
            const response = await PersonalTaskService.getSubtasks(task_id);

            return response;
        },
    });

    static createSubtask = (queryClient: QueryClient) => useMutation<
        IPersonalTask,
        Error,
        UpdateTaskProps<IPersonalTask<number, number>>,
        unknown
        >({
        mutationKey: PersonalTaskRepository.keys.mutation.create(),
        mutationFn: async ({taskId, task}) => {
            const response = await PersonalTaskService.createSubtask(taskId, task);

            return response;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: PersonalTaskRepository.keys.root
            });
        },
    });
}