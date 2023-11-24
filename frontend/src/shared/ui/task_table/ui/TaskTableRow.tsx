import React, {FC, HTMLAttributes, MouseEventHandler, PropsWithChildren} from 'react';
import cn from "classnames";

import s from "./styles.module.scss";

type TaskTableRowProps = PropsWithChildren<{
    header?: boolean;
    full?: boolean;

    onClick?: MouseEventHandler;
}> & HTMLAttributes<HTMLElement>;

export const TaskTableRow: FC<TaskTableRowProps> = (props) => {
    const {children, className, header, full, onClick} = props;

    return (
        <tr className={cn(s.taskTableRow, className, {
            [s.taskTableRow_header]: header,
            [s.taskTableRow_full]: full,
        })} onClick={onClick}>
            {children}
        </tr>
    );
};