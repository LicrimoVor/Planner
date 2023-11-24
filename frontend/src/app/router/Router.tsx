import React, {lazy} from 'react';
import {Navigate, Outlet, RouteObject, useRoutes} from "react-router-dom";
import {ROUTES} from "@shared/config";
import {Loader} from "@shared/ui";
import {AuthGuard, GuestGuard, sessionStore} from "@entities/session";
import {MainLayout} from "@pages/main_layout";

const LoginPage = Loader(lazy(() => import("@pages/login")));
const RegistrationPage = Loader(lazy(() => import("@pages/registration")));
const RecoveryPage = Loader(lazy(() => import("@pages/recovery")));

const ProfilePage = Loader(lazy(() => import("@pages/profile")));
const PersonalPage = Loader(lazy(() => import("@pages/personal")));

const SpacesPage = Loader(lazy(() => import("@pages/spaces")));
const SpaceCreatePage = Loader(lazy(() => import("@pages/space_create")));
const SpaceSettingsPage = Loader(lazy(() => import("@pages/space_settings")));
const SpacesTaskPage = Loader(lazy(() => import("@pages/spaces_task")));

const SettingsPage = Loader(lazy(() => import("@pages/settings")));
const ChangePasswordPage = Loader(lazy(() => import("@pages/change_password")));

const getRoutes = (isAuth: boolean): RouteObject[] => [
    {
        path: ROUTES.ROOT,
        children: [
            {
                index: true,
                element: <Navigate to={ROUTES.USER.PERSONAL.ROOT()} replace />
            },
            {
                path: ROUTES.AUTH.ROOT(),
                element: (
                    <GuestGuard isAuth={isAuth}>
                        <Outlet />
                    </GuestGuard>
                ),
                children: [
                    {
                        path: ROUTES.AUTH.LOGIN.ROOT(),
                        element: <LoginPage />
                    },
                    {
                        path: ROUTES.AUTH.REGISTRATION.ROOT(),
                        element: <RegistrationPage />
                    },
                    {
                        path: ROUTES.AUTH.RECOVERY.ROOT(),
                        element: <RecoveryPage />
                    },
                    {
                        path: ROUTES.AUTH.RECOVERY.CHANGE(),
                        element: <RecoveryPage change />
                    },
                ]
            },
            {
                path: ROUTES.USER.ROOT(),
                element: (
                    <AuthGuard isAuth={isAuth}>
                        <MainLayout />
                    </AuthGuard>
                ),
                children: [
                    {
                        path: ROUTES.USER.PROFILE.ROOT(),
                        element: <ProfilePage />
                    },
                    {
                        path: ROUTES.USER.PERSONAL.ROOT(),
                        element: <PersonalPage />
                    },
                    {
                        path: ROUTES.USER.SPACE.ROOT(),
                        element: <SpacesPage />
                    },
                    {
                        path: ROUTES.USER.SPACE.CREATE(),
                        element: <SpaceCreatePage />
                    },
                    {
                        path: ROUTES.USER.SPACE.TASK(),
                        element: <SpacesTaskPage />
                    },
                    {
                        path: ROUTES.USER.SPACE.SETTINGS(),
                        element: <SpaceSettingsPage />
                    },
                    {
                        path: ROUTES.USER.SETTINGS.ROOT(),
                        element: <SettingsPage />
                    },
                    {
                        path: ROUTES.USER.SETTINGS.CHANGE_PASSWORD(),
                        element: <ChangePasswordPage />
                    },
                ]
            }
        ],
    },
    {
        path: ROUTES.OTHER(),
        element: <Navigate to={ROUTES.NOT_FOUND()} replace />
    },
    {
        path: ROUTES.NOT_FOUND(),
        element: <div>Ошибка, кринж.......</div>
    }
];

export const Router = () => {
    const isAuth = sessionStore.useSession();

    return useRoutes(getRoutes(isAuth));
}