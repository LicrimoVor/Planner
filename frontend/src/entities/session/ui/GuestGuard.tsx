import React, {FC, PropsWithChildren} from 'react';
import {Navigate} from "react-router-dom";
import {ROUTES} from "@shared/config";

type GuestGuardProps = PropsWithChildren<{
    isAuth: boolean;
}>;

export const GuestGuard: FC<GuestGuardProps> = (props) => {
    const {children, isAuth} = props;

    if(isAuth) {
        return <Navigate to={ROUTES.USER.PERSONAL.ROOT()} replace />
    }

    return <React.Fragment>{children}</React.Fragment>
};