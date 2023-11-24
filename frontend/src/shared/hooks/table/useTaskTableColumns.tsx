import {CellContext, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {ITask, TaskName, UpdateTaskProps} from "@entities/task";
import {TaskTrait, TaskTraitAdd} from "@entities/trait";
import React from "react";
import {QueryClient, UseMutationResult, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {IPaginatorResponse} from "@shared/api";
import {TaskTableCellContent} from "@shared/ui";
import {TaskDeadline} from "@entities/task/ui/TaskDeadline";
import {getInputDateFromDeadline} from "@shared/lib";
import {StatusRepository} from "@entities/status/repository";
import {TagRepository} from "@entities/tag/repository";

export function useTaskTableColumns<Task extends ITask, TaskUpdate extends ITask<number, number>>(props: {
    extendedColumns: ColumnDef<Task,  any>[];
    extendAfter: number;

    apiUpdateTask: (queryClient: QueryClient) => UseMutationResult<Task, Error, UpdateTaskProps<TaskUpdate>>;
    apiDeleteTask: (queryClient: QueryClient) => UseMutationResult<void, Error, number>;
}): ColumnDef<Task, any>[] {
    const {
        extendedColumns, extendAfter,
        apiUpdateTask, apiDeleteTask
    } = props;

    const queryClient = useQueryClient();

    const {
        data: statusList,
        isLoading: isStatusListLoading,
        isError: isStatusListError,
        // error: statusListError
    } = StatusRepository.getList();

    const {
        data: tagList,
        isLoading: isTagListLoading,
        isError: isTagListError,
        // error: tagListError
    } = TagRepository.getList();

    const {
        mutate: updateMutation,
        // isError: isUpdateError,
        // error: updateError
    } = apiUpdateTask(queryClient);

    const {
        mutate: deleteMutation,
    } = apiDeleteTask(queryClient);

    // const {
    //     mutate: createMutation,
    //     isError: isCreateError,
    //     error: createError
    // } = apiCreateSubtask(queryClient);

    const columnHelper = createColumnHelper<Task>();
    const columns: ColumnDef<Task,  any>[] = [
        columnHelper.accessor((task) => task, {
            header: "Название",
            cell: (context: CellContext<Task, Task>) => (
                <TaskName
                    onChange={(e) => {
                        if(context.getValue().name === e.target.innerText) {
                            return;
                        }

                        updateMutation({
                            taskId: context.getValue().id,
                            task: {
                                name: e.target.innerText
                            } as Partial<TaskUpdate>
                        });
                    }}
                    name={context.getValue().name}
                    deletable
                    onDelete={() => {
                        deleteMutation(context.getValue().id);
                    }}
                />
            )
        }),
        columnHelper.accessor((task) => task, {
            header: "Статус",
            cell: (context: CellContext<Task, Task>) => (
                <TaskTableCellContent hCenter vCenter>
                    {
                        context.getValue().status ?
                            <TaskTrait
                                removable
                                trait={context.getValue().status}
                                onRemove={() => {
                                    updateMutation({
                                        taskId: context.getValue().id,
                                        task: {
                                            status: null as unknown as undefined
                                        } as Partial<TaskUpdate>
                                    });
                                }}
                            /> :
                            <TaskTraitAdd
                                list={(!isStatusListLoading && !isStatusListError) ? statusList : []}
                                onTraitSelect={(statusId) => {
                                    if(context.getValue().status?.id === statusId) {
                                        return;
                                    }

                                    updateMutation({
                                        taskId: context.getValue().id,
                                        task: {
                                            status: statusId
                                        } as Partial<TaskUpdate>
                                    });
                                }}
                            />
                    }
                </TaskTableCellContent>
            )
        }),
        columnHelper.accessor((task) => task, {
            header: "Теги",
            cell: (context: CellContext<Task, ITask>) => (
                <TaskTableCellContent vCenter>
                    {
                        context.getValue().tags?.map(
                            tag => (
                                <TaskTrait
                                    removable
                                    key={tag.id}
                                    trait={tag}
                                    onRemove={(tagId) => {
                                        updateMutation({
                                            taskId: context.getValue().id,
                                            task: {
                                                tags: context.getValue().tags.filter(tag => tag.id !== tagId)
                                                    .map(tag => tag.id)
                                            } as Partial<TaskUpdate>
                                        });
                                    }}
                                />
                            )
                        )
                    }
                    <TaskTraitAdd
                        list={(!isTagListLoading && !isTagListError) ? tagList : []}
                        onTraitSelect={(tagId) => {
                            if(context.getValue().tags.map(tag => tag.id).includes(tagId)) {
                                return;
                            }

                            updateMutation({
                                taskId: context.getValue().id,
                                task: {
                                    tags: [...context.getValue().tags.map(tag => tag.id), tagId]
                                } as Partial<TaskUpdate>
                            });
                        }}
                    />
                </TaskTableCellContent>
            )
        }),
        columnHelper.accessor((task) => task, {
            header: "Дедлайн",
            cell: (context: CellContext<Task, Task>) => (
                <TaskTableCellContent hCenter vCenter>
                    <TaskDeadline
                        deadline={context.getValue().deadline ? getInputDateFromDeadline(context.getValue().deadline) : undefined}
                        onChange={(e) => {
                            updateMutation({
                                taskId: context.getValue().id,
                                task: {
                                    deadline: e.target.valueAsNumber || null
                                } as Partial<TaskUpdate>
                            });
                        }}
                    />
                </TaskTableCellContent>
            )
        }),
        columnHelper.accessor((task) => task, {
            header: "Описание",
            cell: (context: CellContext<Task, Task>) => (
                <TaskName
                    onChange={(e) => {
                        if(context.getValue().description === e.target.innerHTML) {
                            return;
                        }

                        updateMutation({
                            taskId: context.getValue().id,
                            task: {
                                description: e.target.innerHTML
                            } as Partial<TaskUpdate>
                        });
                    }}
                    name={context.getValue().description}
                    passHtml
                />
            )
        }),
    ];

    switch(extendAfter) {
        case -1: {
            return [
                ...columns,
                ...extendedColumns
            ]
        }
        case 0: {
            return [
                ...extendedColumns,
                ...columns
            ]
        }
        default: {
            return [
                ...columns.slice(0, extendAfter),
                ...extendedColumns,
                ...columns.slice(extendAfter)
            ];
        }
    }
}