import { apiInstance, IPaginatorResponse } from "@shared/api";
import {ITaskStatus} from "@entities/status";

const BASE_URL = "status/";

const ENDPOINTS = {
    ROOT: `${BASE_URL}`,
}

export class StatusService {
    static async getList(): Promise<IPaginatorResponse<ITaskStatus>> {
        return await apiInstance.get(ENDPOINTS.ROOT);
    }
}