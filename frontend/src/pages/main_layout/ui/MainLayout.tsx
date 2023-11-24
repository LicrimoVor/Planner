import React, {useEffect} from 'react';
import {ContentLayout, LoaderHandler} from "@shared/ui";
import Header from "@widgets/header";
import { Outlet } from 'react-router-dom';
import {userStore} from "@entities/user";
import {HeaderSkeleton} from "@widgets/header/ui/HeaderSkeleton";

export const MainLayout = () => {
    const profile = userStore.useProfile();

    useEffect(() => {
        if(!profile) {
            userStore.getMe();
        }
    }, [profile]);

    return (
        <ContentLayout row noAnimation>
            {
                !!profile ? (
                    <React.Fragment>
                        <Outlet />

                        <Header />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <LoaderHandler isLoaded={false} />

                        <HeaderSkeleton />
                    </React.Fragment>
                )
            }

            {/*<Outlet />*/}
            {/*{*/}
            {/*    !!profile ? (*/}
            {/*        <Header />*/}
            {/*    ) : (*/}
            {/*        <HeaderSkeleton />*/}
            {/*    )*/}
            {/*}*/}
        </ContentLayout>
    );
};