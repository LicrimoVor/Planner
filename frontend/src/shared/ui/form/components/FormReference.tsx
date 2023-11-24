import React, {FC, HTMLAttributes} from 'react';
import { useNavigate } from 'react-router-dom';

import s from "./styles/FormReference.module.scss";

type FormReferenceProps = {
    /**
     * URL редиректа
     */
    to: string;
} & HTMLAttributes<HTMLElement>;

export const FormReference: FC<FormReferenceProps> = (props) => {
    const {children, to, ...other} = props;
    const navigation = useNavigate();

    const onClick = () => {
        navigation(to);
    }

    return (
        <p
            className={s.formReference}
            onClick={onClick}
            {...other}
        >{children}</p>
    );
};