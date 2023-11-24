import React from 'react';

import s from "./styles.module.scss";
import {ASSETS} from "@shared/config";

export const Spinner = () => {
    return (
        <div className={s.spinner}>
            <img
                className={s.spinner__img}
                src={ASSETS.IMAGE.GET("SPINNER")}
                alt={"Происходит загрузка..."}
            />
        </div>
    );
};