import React, {ButtonHTMLAttributes, FC} from 'react';

import s from "./styles/FormSubmit.module.scss";

type FormSubmitProps = {

} & ButtonHTMLAttributes<HTMLButtonElement>;

export const FormSubmit: FC<FormSubmitProps> = (props) => {
    const {children, ...other} = props;

    return (
        <button
            className={s.formSubmit}
            {...other}
        >{children}</button>
    );
};