import React, {ChangeEvent, FC} from 'react';

import s from "./styles/TaskDeadline.module.scss";
import {getDateFromDeadline} from "@shared/lib";

type TaskDeadlineProps = {
    deadline?: string;

    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const TaskDeadline: FC<TaskDeadlineProps> = (props) => {
    const {deadline, onChange} = props;

    return (
        <div className={s.taskDeadline}>
            <p className={s.taskDeadline__label}>
                {
                    deadline ? getDateFromDeadline(deadline) : "Не назначено"
                }
            </p>
            <input className={s.taskDeadline__button} type={"datetime-local"} onChange={onChange} value={deadline} />
        </div>
    );
};