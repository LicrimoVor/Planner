import React, {FC, PropsWithChildren} from 'react';
import cn from "classnames";

import s from "./styles.module.scss";

type ContentLayoutProps = PropsWithChildren<{
    center?: boolean;
    hCenter?: boolean;
    vCenter?: boolean;

    row?: boolean;

    noAnimation?: boolean;

    full?: boolean;
}>;

export const ContentLayout: FC<ContentLayoutProps> = (props) => {
    const {children, center, hCenter, vCenter, row, noAnimation, full} = props;

    return (
        <div className={cn(s.contentLayout, {
            [s.contentLayout_center]: center,
            [s.contentLayout_hCenter]: hCenter,
            [s.contentLayout_vCenter]: vCenter,
            [s.contentLayout_row]: row,
            [s.contentLayout_noAnimation]: noAnimation,
            [s.contentLayout_full]: full,
        })}>
            {children}
        </div>
    );
};