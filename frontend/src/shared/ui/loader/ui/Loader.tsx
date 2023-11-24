import React, { Suspense, ElementType } from 'react';
import {Spinner} from "@shared/ui/spinner";
import {LoaderHandler} from "@shared/ui";

export const Loader = (Component: ElementType) => {
    return (props: any) => {
        return (
            <Suspense
                fallback={(<LoaderHandler isLoaded={false} />)}
            >
                <Component {...props} />
            </Suspense>
        );
    };
};