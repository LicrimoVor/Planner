import React from 'react';
import {ContentLayout, LoaderHandler} from "@shared/ui";
import {SpaceTaskTable} from "@widgets/space_task_table";
import {useParams} from "react-router-dom";
import {SpaceRepository} from "@entities/space";

export const SpacesTaskPage = () => {
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
        <ContentLayout hCenter>
            {
                isSuccess && (
                    <SpaceTaskTable space={space} />
                )
            }
            {
                isError && (
                    <p>Произошла ошибка при загрузке</p>
                )
            }
        </ContentLayout>
    );
};