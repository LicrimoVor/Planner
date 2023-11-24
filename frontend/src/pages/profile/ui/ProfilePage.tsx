import React from 'react';
import {ContentLayout, LoaderHandler} from "@shared/ui";
import {userStore} from "@entities/user";

export const ProfilePage = () => {
    const profile = userStore.useProfile();

    return (
        <LoaderHandler isLoaded={!!profile}>
            <ContentLayout>
                Профиль
            </ContentLayout>
        </LoaderHandler>
    );
};