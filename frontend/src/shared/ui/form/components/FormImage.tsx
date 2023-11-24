import React, {ChangeEventHandler, FC} from 'react';
import cn from "classnames";

import s from "./styles/FormInput.module.scss";

type FormImageProps = {
    /**
     * Заголовок
     */
    header?: string;

    /**
     * Текст ошибки
     */
    error?: string | null;

    /**
     * Путь для картинки
     */
    src?: string;

    onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const FormImage: FC<FormImageProps> = (props) => {
    const {onChange, header, error, src, ...other} = props;

    return (
        <div className={cn(s.formInput, s.formInput_center, s.formInput_fullWidth)}>
            {header && (
                <p className={s.formInput__header}>
                    {header}
                    {error && (
                        <span className={s.formInput__header_error}>*{error}</span>
                    )}
                </p>
            )}

            <img
                className={s.formInput__image}
                src={src}
                alt={""}
            />

            <input
                className={cn(s.formInput__input)}
                type={"file"}
                onChange={onChange}
                {...other}
            />
        </div>

    );
};