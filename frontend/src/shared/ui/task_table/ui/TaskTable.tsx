import React, {FC, MouseEventHandler, PropsWithChildren} from 'react';

import s from "./styles.module.scss";
import {TaskTableCell, TaskTableCellContent, TaskTableRow} from "@shared/ui";
import {ASSETS} from "@shared/config";

type TaskTableProps = PropsWithChildren<{
    headers: (JSX.Element | React.ReactNode)[];
    rows: (JSX.Element | React.ReactNode)[][];

    onAdd: MouseEventHandler;
}>;

export const TaskTable: FC<TaskTableProps> = (props) => {
    const {headers, rows, onAdd} = props;

    return (
        <table className={s.taskTable}>
            <thead>
                <TaskTableRow header>
                    {
                        headers.map((header, index) => (
                            <TaskTableCell key={index}>
                                <TaskTableCellContent hCenter vCenter header>
                                    {header}
                                </TaskTableCellContent>
                            </TaskTableCell>
                        ))
                    }
                </TaskTableRow>
                <TaskTableRow className={s.taskTableAdd} full onClick={onAdd}>
                    <TaskTableCell>
                        <TaskTableCellContent hCenter vCenter>
                            <img
                                className={s.taskTableAdd__image}
                                src={ASSETS.IMAGE.GET("PLUS")}
                                alt={""}
                            />
                            <p className={s.taskTableAdd__label}>Добавить новую задачу</p>
                        </TaskTableCellContent>
                    </TaskTableCell>
                </TaskTableRow>
            </thead>
            <tbody>
            {
                rows.map((row, index) => (
                    <TaskTableRow key={index}>
                        {
                            row.map((cell, index) => (
                                <TaskTableCell key={index}>{cell}</TaskTableCell>
                            ))
                        }
                    </TaskTableRow>
                ))
            }
            </tbody>
        </table>
    );
};