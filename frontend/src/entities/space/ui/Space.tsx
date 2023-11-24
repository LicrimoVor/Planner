import React, {FC} from 'react';
import {ISpace} from "@entities/space";
import {userStore} from "@entities/user";
import {NavLink} from "react-router-dom";
import {ROUTES} from "@shared/config";

import s from "./styles.module.scss";
import {apiInstance} from "@shared/api";

type SpaceProps = {
    data: ISpace;
};

export const Space: FC<SpaceProps> = (props) => {
    const {data} = props;

    const profile = userStore.useProfile()!;

    const isAdmin = data.admin.id === profile.user.id;

    return (
        <div className={s.space}>
            <img
                className={s.space__avatar}
                src={apiInstance.getMedia(data.avatar)}
            />
            <div className={s.spaceInfo}>
                <p className={s.spaceInfo__name}>{data.name}</p>
                {
                    isAdmin && (
                        <p className={s.spaceInfo__admin}>Вы являетесь администратором</p>
                    )
                }
                <NavLink
                    className={s.spaceInfo__link}
                    to={ROUTES.USER.SPACE.TASK(data.id)}
                >Перейти к задачам</NavLink>
                {
                    isAdmin && (
                        <NavLink
                            className={s.spaceInfo__link}
                            to={ROUTES.USER.SPACE.SETTINGS(data.id)}
                        >Управление пространством</NavLink>
                    )
                }
            </div>
        </div>
    );
};