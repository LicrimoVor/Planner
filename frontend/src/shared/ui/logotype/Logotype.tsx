import React, {FC, ImgHTMLAttributes} from 'react';
import {ASSETS} from "@shared/config";
import cn from "classnames";

import s from "./styles.module.scss";

export const Logotype: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
    const {className, ...other} = props;

    return (
        <img
            src={ASSETS.IMAGE.GET("LOGOTYPE")}
            className={cn(s.logotype, className)}
            {...other}
            alt={"Планер"}
        />
    );
};