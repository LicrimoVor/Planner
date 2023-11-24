import React, {FC, PropsWithChildren} from 'react';

import s from "./styles.module.scss";

export const Background: FC<PropsWithChildren> = (props) => {
    const {children} = props;

    return (
        <React.Fragment>
            <div className={s.backgroundLayout} />

            {children}
        </React.Fragment>

    );
};