import {IUser} from "@entities/user";

export interface ISpace<User = IUser> {
    readonly id: number;
    name: string;
    readonly admin: User;
    staff: User[];
    avatar: string;
}