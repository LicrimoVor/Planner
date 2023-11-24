import {ITask} from "@entities/task";
import {ITaskStatus} from "@entities/status";
import {ITaskTag} from "@entities/tag";

export interface IPersonalTask<Status = ITaskStatus, Tag = ITaskTag> extends ITask<Status, Tag> {

}