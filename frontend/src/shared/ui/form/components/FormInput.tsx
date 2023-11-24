import React, {FC} from 'react';
import ReactInputMask from "react-input-mask";
import { Props } from "react-input-mask";
import cn from "classnames";

import s from "./styles/FormInput.module.scss";

type FormInputProps = {
    /**
     * Заголовок
     */
    header?: string;

    /**
     * Текст ошибки
     */
    error?: string | null;
} & Props;

export const FormInput: FC<FormInputProps> = (props) => {
    const {type, onChange, placeholder, mask, header, error, ...other} = props;

    return (
        <div className={s.formInput}>
            {header && (
                <p className={s.formInput__header}>
                    {header}
                    {error && (
                        <span className={s.formInput__header_error}>*{error}</span>
                    )}
                </p>
            )}

            <ReactInputMask
                className={cn(s.formInput__input, {
                    [s.formInput__input_error]: error
                })}
                type={type}
                mask={mask}
                placeholder={placeholder}
                onChange={onChange}
                {...other}
            />

            {/*{error && (*/}
            {/*    <p className={s.formInput__error}>{error}</p>*/}
            {/*)}*/}
        </div>

    );
};