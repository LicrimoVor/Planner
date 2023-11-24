import {apiInstance, IPaginatorResponse} from "@shared/api";
import {IPersonalTask} from "@entities/task";
import {ITaskStatus} from "@entities/status";
import { ITaskTag } from "@entities/tag";

const BASE_URL = "task_me/";

const ENDPOINTS = {
    ROOT: `${BASE_URL}`,
    SPACE_TASKS: `${BASE_URL}spaces/`,
}

export class PersonalTaskService {
    static async getList(params: string = ""): Promise<IPaginatorResponse<IPersonalTask>> {
        return await apiInstance.get(ENDPOINTS.ROOT + params);
    }

    static async create(task: Partial<IPersonalTask<number, number>>): Promise<IPersonalTask> {
        return await apiInstance.post(ENDPOINTS.ROOT, task);
    }

    static async delete(taskId: number): Promise<void> {
        return await apiInstance.delete(ENDPOINTS.ROOT + `${taskId}/`);
    }

    static async getSpaceTasks(): Promise<IPaginatorResponse<IPersonalTask>> {
        return await apiInstance.get(ENDPOINTS.SPACE_TASKS);
    }

    static async getTask(taskId: number): Promise<IPersonalTask> {
        return await apiInstance.get(`${ENDPOINTS.ROOT}${taskId}/`);
    }

    static async updateTask(taskId: number, task: Partial<IPersonalTask<number, number>>): Promise<IPersonalTask> {
        return await apiInstance.patch(`${ENDPOINTS.ROOT}${taskId}/`, task);
    }

    static async removeTask(taskId: number): Promise<void> {
        return await apiInstance.delete(`${ENDPOINTS.ROOT}${taskId}/`);
    }

    static async getSubtasks(taskId: number): Promise<IPaginatorResponse<IPersonalTask>> {
        return await apiInstance.get(`${ENDPOINTS.ROOT}${taskId}/subtasks/`);
    }

    static async createSubtask(taskId: number, task: Partial<IPersonalTask<number, number>>): Promise<IPersonalTask> {
        return await apiInstance.post(`${ENDPOINTS.ROOT}${taskId}/subtasks/`, task);
    }
}