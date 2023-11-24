import {apiInstance, IPaginatorResponse} from "@shared/api";
import {ISpaceTask} from "@entities/task/space/api/models";

const ENDPOINTS = {
    ROOT: (spaceId: number) => `space/${spaceId}/`,

    TASK: {
        ROOT: (spaceId: number, taskId?: number) => `${ENDPOINTS.ROOT(spaceId)}task/${taskId ? `${taskId}/` : ""}`,
    }
}

export class SpaceTaskService {
    static async getList(spaceId: number, params: string = ""): Promise<IPaginatorResponse<ISpaceTask>> {
        return await apiInstance.get(ENDPOINTS.TASK.ROOT(spaceId) + params);
    }

    static async updateTask(spaceId: number, taskId: number, task: Partial<ISpaceTask<number, number, number>>):
        Promise<ISpaceTask> {
        return await apiInstance.patch(ENDPOINTS.TASK.ROOT(spaceId, taskId), task);
    }

    static async delete(spaceId: number, taskId: number): Promise<void> {
        return await apiInstance.delete(ENDPOINTS.TASK.ROOT(spaceId, taskId));
    }

    static async createTask(spaceId: number, task: Partial<ISpaceTask<number, number, number>>): Promise<ISpaceTask> {
        return await apiInstance.post(ENDPOINTS.TASK.ROOT(spaceId), task);
    }
}