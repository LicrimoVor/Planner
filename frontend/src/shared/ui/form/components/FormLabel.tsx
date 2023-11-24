import React, {FC, PropsWithChildren} from 'react';
import cn from "classnames";

import s from "./styles/FormLabel.module.scss";

type FormLabelProps = PropsWithChildren<{
    success?: boolean;

    error?: boolean;
}>

export const FormLabel: FC<FormLabelProps> = (props) => {
    const {children, success, error, ...other} = props;

    return (
        <p
            className={cn(s.formLabel, {
                [s.formLabel_error]: error,
                [s.formLabel_success]: success,
            })}
            {...other}
        >{children}</p>
    );
};