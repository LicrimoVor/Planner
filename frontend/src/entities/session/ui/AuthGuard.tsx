import React, {FC, PropsWithChildren} from 'react';
import {Navigate} from "react-router-dom";
import {ROUTES} from "@shared/config";

type AuthGuardProps = PropsWithChildren<{
    isAuth: boolean;
}>;

export const AuthGuard: FC<AuthGuardProps> = (props) => {
    const {children, isAuth} = props;

    if(!isAuth) {
        return <Navigate to={ROUTES.AUTH.LOGIN.ROOT()} replace />
    }

    return <React.Fragment>{children}</React.Fragment>
};