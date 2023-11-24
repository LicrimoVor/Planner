import React, {FC, FormEvent, FormHTMLAttributes} from 'react';
import cn from "classnames";

import s from "./styles.module.scss";

export type FormProps = {
    /**
     * Широкая форма на 2 столбца
     */
    wide?: boolean;

    /**
     * Отцентровать по вертикали
     */
    center?: boolean;
} & FormHTMLAttributes<HTMLFormElement>;

export const Form: FC<FormProps> = (props) => {
    const {children, className, wide, center, onSubmit, ...other} = props;

    const _onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if(onSubmit) onSubmit(e);
    };


    return (
        <form
            className={cn(s.form, className, {
                [s.form_wide]: wide,
                [s.form_center]: center,
            })}
            onSubmit={_onSubmit}
            {...other}
        >
            {children}
        </form>
    );
};