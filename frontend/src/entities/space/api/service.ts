import {apiInstance, IPaginatorResponse} from "@shared/api";
import {ISpace} from "@entities/space";

const ENDPOINTS = {
    ROOT: "space/",
    
    ME: {
        ROOT: () => ENDPOINTS.ROOT + "me/",
    },

    SPACE: {
        ROOT: (spaceId: number) => ENDPOINTS.ROOT + `${spaceId}/`,
    }
}

export class SpaceService {
    static async getMy(): Promise<IPaginatorResponse<ISpace>> {
        return await apiInstance.get(ENDPOINTS.ME.ROOT());
    }

    static async getById(spaceId: number): Promise<ISpace> {
        return await apiInstance.get(ENDPOINTS.SPACE.ROOT(spaceId));
    }

    static async create(space: Partial<ISpace<number>>): Promise<ISpace> {
        return await apiInstance.post(ENDPOINTS.ROOT, space);
    }

    static async update(spaceId: number, space: Partial<ISpace<number>>): Promise<ISpace> {
        return await apiInstance.patch(ENDPOINTS.SPACE.ROOT(spaceId), space);
    }
}