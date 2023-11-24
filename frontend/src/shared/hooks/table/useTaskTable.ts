import React, {MouseEventHandler, useCallback} from "react";
import {QueryClient, UseMutationResult, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {IPaginatorResponse} from "@shared/api";
import {ColumnDef, useReactTable, getCoreRowModel, Table, flexRender} from "@tanstack/react-table";
import {useTaskTableColumns} from "@shared/hooks/table/useTaskTableColumns";
import {ITask, UpdateTaskProps} from "@entities/task";
// import {useTaskFilter} from "@shared/hooks";
import {TaskFilter} from "@shared/types";

export function useTaskTable<Task extends ITask, TaskUpdate extends ITask<number, number>>(props: {
    extendedColumns?: ColumnDef<Task, any>[];
    extendAfter?: number;
    filters?: Partial<TaskFilter>;

    apiGet: (params?: string) => UseQueryResult<IPaginatorResponse<Task>>;
    apiUpdateTask: (queryClient: QueryClient) => UseMutationResult<Task, Error, UpdateTaskProps<TaskUpdate>>;
    apiAddTask: (queryClient: QueryClient) => UseMutationResult<Task, Error, Partial<TaskUpdate>>;
    apiDeleteTask: (queryClient: QueryClient) => UseMutationResult<void, Error, number>;
}): {
    table: Table<Task>;
    headers: (JSX.Element | React.ReactNode)[];
    rows: (JSX.Element | React.ReactNode)[][];
    tasks: Task[] | null;
    updateTable: () => void;
    onAddHandler: MouseEventHandler;
} {
    const {
        extendedColumns, extendAfter,
        apiGet, apiUpdateTask, apiAddTask, apiDeleteTask
    } = props;

    const queryClient = useQueryClient();

    // const {params: filterParams} = useTaskFilter({
    //     filters: filters || {}
    // });

    const {
        data: response,
        refetch
    } = apiGet("?main=true");
    const tasks = response?.results || null;

    const updateTable = useCallback(async () => {
        await refetch();
    }, [refetch]);

    const columns = useTaskTableColumns<Task, TaskUpdate>({
        extendedColumns: extendedColumns || [],
        extendAfter: extendAfter || 0,

        apiUpdateTask: apiUpdateTask,
        apiDeleteTask: apiDeleteTask,
    });

    const table = useReactTable({
        columns: columns,
        data: tasks || [],
        getCoreRowModel: getCoreRowModel(),
        enableColumnResizing: true,
        columnResizeMode: "onChange"
    });

    const headers = table.getHeaderGroups()[0].headers.map(header =>
        flexRender(header.column.columnDef.header, header.getContext())
    );
    const rows = table.getRowModel().rows.map(row =>
        row.getVisibleCells().map(cell =>
            flexRender(cell.column.columnDef.cell, cell.getContext())
        )
    );

    const {
        mutateAsync: createMutation
    } = apiAddTask(queryClient);
    const onAddHandler: MouseEventHandler = async (e) => {
        await createMutation({

        });
    };

    return {
        table,
        headers,
        rows,
        tasks,
        updateTable,
        onAddHandler
    }
}