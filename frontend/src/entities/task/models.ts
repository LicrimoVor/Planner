import {ITaskStatus} from "@entities/status";
import {ITaskTag} from "@entities/tag";

export interface ITask<Status = ITaskStatus, Tag = ITaskTag> {
    id: number;
    name: string;
    description: string;
    status: Status;
    tags: Tag[];
    deadline: number;
}

export type UpdateTaskProps<Task extends ITask<number, number>> = {
    taskId: number;
    task: Partial<Task>;
}