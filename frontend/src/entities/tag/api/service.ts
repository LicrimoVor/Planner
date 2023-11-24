import {apiInstance, IPaginatorResponse} from "@shared/api";
import {ITaskTag} from "@entities/tag";

const BASE_URL = "tags/";

const ENDPOINTS = {
    ROOT: `${BASE_URL}`,
}

export class TagService {
    static async getList(): Promise<IPaginatorResponse<ITaskTag>> {
        return await apiInstance.get(ENDPOINTS.ROOT);
    }
}