import {ITaskStatus} from "@entities/status";
import {ITaskTag} from "@entities/tag";
import {ITask} from "@entities/task";
import {IUser} from "@entities/user";
import {ISpace} from "@entities/space";

export interface ISpaceTask<Status = ITaskStatus, Tag = ITaskTag, Responsible = IUser> extends ITask<Status, Tag> {
    responsibles: Responsible[];
    readonly space: ISpace;
}