import React, {FC, PropsWithChildren} from 'react';
import cn from "classnames";

import s from "./styles.module.scss";

type TaskTableCellProps = PropsWithChildren<{

}>;

export const TaskTableCell: FC<TaskTableCellProps> = (props) => {
    const {children} = props;

    return (
        <th className={cn(s.taskTableCell, {

        })}>
            {children}
        </th>
    );
};

type TaskTableCellContentProps = PropsWithChildren<{
    hCenter?: boolean;
    vCenter?: boolean;

    header?: boolean;
}>;

export const TaskTableCellContent: FC<TaskTableCellContentProps> = (props) => {
    const {children, hCenter, vCenter, header} = props;

    return (
        <div className={cn(s.taskTableCellContent, {
            [s.taskTableCellContent_hCenter]: hCenter,
            [s.taskTableCellContent_vCenter]: vCenter,
            [s.taskTableCellContent_header]: header,
        })}>
            {children}
        </div>
    );
};