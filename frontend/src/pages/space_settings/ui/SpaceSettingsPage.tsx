import React from 'react';
import {ContentLayout, LoaderHandler} from "@shared/ui";
import {SpaceSettingsForm} from "@widgets/space_settings_form";
import {Navigate, useParams} from "react-router-dom";
import {SpaceRepository} from "@entities/space";
import {ROUTES} from "@shared/config";

export const SpaceSettingsPage = () => {
    const spaceParam = useParams().spaceId;
    const spaceId = spaceParam ? parseInt(spaceParam) : 0;

    const {
        isLoading,
        isSuccess,
        isError,
        data: space,
    } = SpaceRepository.getById(spaceId);

    if(isLoading) {
        return <LoaderHandler isLoaded={false} />;
    }

    return (
        <ContentLayout hCenter vCenter>
            {
                isSuccess && (
                    <SpaceSettingsForm space={space} />
                )
            }
            {
                isError && (
                    <Navigate to={ROUTES.USER.SPACE.ROOT()} replace />
                )
            }
        </ContentLayout>
    );
};