import React, {FC, useEffect} from 'react';
import { useParams } from 'react-router';
import {useTaskTable} from "@shared/hooks";
import {SpaceTaskRepository} from "@entities/task";
import {QueryClient, useQueryClient} from "@tanstack/react-query";
import {LoaderHandler, TaskTable, TaskTableCellContent} from "@shared/ui";
import {ISpaceTask} from "@entities/task";
import {CellContext, createColumnHelper } from '@tanstack/react-table';
import {ITrait, TaskTrait, TaskTraitAdd} from "@entities/trait";
import {ISpace} from "@entities/space";

import s from "./styles.module.scss";

type SpaceTaskTableProps = {
    space: ISpace;
}

export const SpaceTaskTable: FC<SpaceTaskTableProps> = (props) => {
    const {space} = props;

    const columnHelper = createColumnHelper<ISpaceTask>();

    const queryClient = useQueryClient();

    const {
        mutate: updateMutation,
        // isError: isUpdateError,
        // error: updateError
    } = SpaceTaskRepository.updateTask(space.id, queryClient);

    const {
        headers, rows,
        tasks, updateTable,
        onAddHandler
    } = useTaskTable<ISpaceTask, ISpaceTask<number, number, number>>({
        extendAfter: 3,
        extendedColumns: [
            columnHelper.accessor(task => task, {
                header: "Ответственные",
                cell: (context: CellContext<ISpaceTask, ISpaceTask>) => (
                    <TaskTableCellContent hCenter vCenter>
                        {
                            context.getValue().responsibles.map(
                                resUser => (
                                    <TaskTrait
                                        removable
                                        key={resUser.id}
                                        trait={{
                                            id: resUser.id,
                                            name: resUser.username,
                                            color: resUser.color
                                        } as ITrait}
                                        onRemove={(responsibleId) => {
                                            updateMutation({
                                                taskId: context.getValue().id,
                                                task: {
                                                    responsibles: context.getValue().responsibles
                                                        .filter(resUser => resUser.id !== responsibleId)
                                                        .map(tag => tag.id)
                                                } as Partial<ISpaceTask<number, number, number>>
                                            });
                                        }}
                                    />
                                )
                            )
                        }
                        <TaskTraitAdd
                            list={
                                space.staff.map(user => {
                                    return {
                                        id: user.id,
                                        name: user.username,
                                        color: user.color
                                    }
                                }) as ITrait[]
                            }
                            onTraitSelect={(staffId) => {
                                if(context.getValue().responsibles.map(user => user.id).includes(staffId)) {
                                    return;
                                }

                                updateMutation({
                                    taskId: context.getValue().id,
                                    task: {
                                        responsibles: [
                                            ...context.getValue().responsibles.map(user => user.id),
                                            staffId
                                        ]
                                    } as Partial<ISpaceTask<number, number, number>>
                                });
                            }}
                        />
                    </TaskTableCellContent>
                )
            })
        ],
        apiGet: (params?: string) => SpaceTaskRepository.getList(space.id, params),
        apiUpdateTask: (queryClient: QueryClient) => SpaceTaskRepository.updateTask(space.id, queryClient),
        apiAddTask: (queryClient: QueryClient) => SpaceTaskRepository.createTask(space.id, queryClient),
        apiDeleteTask: (queryClient) => SpaceTaskRepository.deleteTask(space.id, queryClient)
    });

    useEffect(() => {
        updateTable();
    }, [updateTable]);

    if(!tasks) {
        return <LoaderHandler isLoaded={false} />;
    }

    return (
        <React.Fragment>
            <p className={s.title}>Пространство <span>{space.name}</span></p>
            <TaskTable headers={headers} rows={rows} onAdd={onAddHandler} />
        </React.Fragment>
    );
};