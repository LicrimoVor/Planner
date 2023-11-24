import React, {FC, PropsWithChildren} from 'react';
import {Logotype} from "@shared/ui";

import s from "./styles.module.scss";

export const AuthHeader: FC<PropsWithChildren> = (props) => {
    const {children} = props;

    return (
        <div className={s.authHeader}>
            <Logotype className={s.authHeader__logo} />
            <p className={s.authHeader__label}>{children}</p>
        </div>
    );
};