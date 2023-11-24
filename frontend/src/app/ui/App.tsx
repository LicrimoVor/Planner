import React from 'react';
import {BrowserRouter } from 'react-router-dom';
import {Router} from "../router";
import { QueryClientProvider } from "../query_client_provider";
import {Background} from "@shared/ui";

export const App = () => {
    return (
        <Background>
            <QueryClientProvider>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </QueryClientProvider>
        </Background>
    );
};