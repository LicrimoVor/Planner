import React from 'react';
import {Space, SpaceRepository} from "@entities/space";
import {ContentLayout, LoaderHandler} from "@shared/ui";

import s from "./styles.module.scss";
import {ASSETS, ROUTES} from "@shared/config";
import { NavLink } from 'react-router-dom';
import {useQueryClient} from "@tanstack/react-query";

export const SpacesList = () => {
    const queryClient = useQueryClient();

    const {
        data: spaces,
        isSuccess,
        isError,
    } = SpaceRepository.getMy(queryClient);

    return (
        <LoaderHandler isLoaded={isSuccess || isError}>
            <ContentLayout hCenter>
                <div className={s.spacesList}>
                    <p className={s.spacesList__title}>Список ваших пространств</p>
                    <NavLink className={s.spacesListCreate} to={ROUTES.USER.SPACE.CREATE()}>
                        <img
                            className={s.spacesListCreate__image}
                            src={ASSETS.IMAGE.GET("PLUS")}
                            alt={""}
                        />
                        <p className={s.spacesListCreate__label}>Создать новое пространство...</p>
                    </NavLink>
                    {
                        isSuccess && (
                            spaces.results.map(space => (
                                <Space key={space.id} data={space} />
                            ))
                        )
                    }
                    {
                        isError && (
                            <p>Произошла ошибка</p>
                        )
                    }
                </div>
            </ContentLayout>
        </LoaderHandler>
    );
};