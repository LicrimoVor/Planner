import React, {FC, PropsWithChildren} from 'react';
import {QueryClientProvider as TanStackQueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const QueryClientProvider: FC<PropsWithChildren> = (props) => {
    const {children} = props;

    return (
        <TanStackQueryClientProvider client={queryClient}>
            {children}
        </TanStackQueryClientProvider>
    );
};