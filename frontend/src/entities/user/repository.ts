import { useQuery } from "@tanstack/react-query";
import {IPaginatorResponse} from "@shared/api";
import {IUser, UserService} from "@entities/user/api";

export class UserRepository {
    static keys = {
        root: ["users"],

        list: {
            root: () => [...this.keys.root, "list"]
        },
    }

    static search = (searchText: string) => useQuery<
        IPaginatorResponse<IUser>,
        Error
    >({
        queryKey: [...UserRepository.keys.list.root(), searchText],

        queryFn: async () => {
            if(!searchText.length) {
                throw new Error();
            }
            const response = await UserService.search(searchText);

            return response;
        },

        retry: false,
    })
}