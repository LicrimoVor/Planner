import React from 'react';
import cn from "classnames";

import s from "./styles.module.scss";
import {ASSETS} from "@shared/config/assets";

export const HeaderSkeleton = () => {
    return (
        <div className={cn(s.header, s.header_skeleton)}>
            <div className={s.headerProfile}>
                <p className={s.headerProfile__username} />

                <img
                    className={s.headerProfile__image}
                    src={ASSETS.IMAGE.GET("ACCOUNT")}
                    alt={""}
                />
            </div>

            <div className={s.header__line} />
        </div>
    );
}