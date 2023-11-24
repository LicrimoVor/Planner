import React from 'react';
import {API_META} from "@shared/api";
import {Spinner} from "@shared/ui/spinner";
import {Outlet} from 'react-router-dom';

export const AuthLoader = () => {
    // if(meta === API_META.LOADING || meta === API_META.INITIAL) {
    //     return <Spinner />;
    // }

    return <Outlet />;
};