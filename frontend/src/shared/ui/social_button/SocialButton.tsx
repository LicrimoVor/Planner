import React, {ButtonHTMLAttributes, FC, ImgHTMLAttributes} from 'react';
import cn from "classnames";

import s from "./styles.module.scss";

type SocialButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ImgHTMLAttributes<HTMLImageElement>;

export const SocialButton: FC<SocialButtonProps> = (props) => {
    const {children, className, src, onClick} = props;

    return (
        <button className={cn(s.socialButton, className)} type={"button"} onClick={onClick}>
            <img className={s.socialButton__img} src={src} alt={""} />
            <p className={s.socialButton__label}>{children}</p>
        </button>
    );
};