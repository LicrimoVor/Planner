import React, {useEffect} from 'react';
import {useTaskTable} from "@shared/hooks";
import {IPersonalTask, PersonalTaskRepository} from "@entities/task";
import {LoaderHandler, TaskTable} from "@shared/ui";
import { QueryClient } from '@tanstack/react-query';

export const PersonalTaskTable = () => {
    const {
        headers, rows,
        tasks, updateTable,
        onAddHandler,
    } = useTaskTable<IPersonalTask, IPersonalTask<number, number>>({
        apiGet: (params?: string) => PersonalTaskRepository.getList(params),
        apiUpdateTask: (queryClient: QueryClient) => PersonalTaskRepository.updateTask(queryClient),
        apiAddTask: (queryClient: QueryClient) => PersonalTaskRepository.createTask(queryClient),
        apiDeleteTask: (queryClient: QueryClient) => PersonalTaskRepository.deleteTask(queryClient)
    });

    useEffect(() => {
        updateTable();
    }, [updateTable]);

    return (
        <LoaderHandler isLoaded={!!tasks}>
            <TaskTable headers={headers} rows={rows} onAdd={onAddHandler} />
        </LoaderHandler>
    );
};