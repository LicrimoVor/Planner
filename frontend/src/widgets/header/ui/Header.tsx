import React from 'react';
import {userStore} from "@entities/user";
import cn from "classnames";

import s from "./styles.module.scss";
import {ASSETS, ROUTES} from "@shared/config";
import {NavLink, useLocation} from "react-router-dom";
import {AuthRepository} from "@entities/session";

export const Header = () => {
    const profile = userStore.useProfile()!;
    const path = useLocation().pathname;

    const onLogout = async () => await AuthRepository.logout();

    return (
        <div className={s.header}>
            <div className={s.headerProfile}>
                <p className={s.headerProfile__username} style={{color: profile!.color}}>{profile!.user.username}</p>

                <img
                    className={s.headerProfile__image}
                    src={userStore.getAvatar()!}
                    alt={""}
                />
            </div>

            <div className={s.header__line} />

            <NavLink className={cn(s.headerLink, {[s.headerLink_active]: path.includes(ROUTES.USER.PROFILE.ROOT())})} to={ROUTES.USER.PROFILE.ROOT()}>
                <p className={s.headerLink__label}>Профиль</p>
                <img className={s.headerLink__image} src={ASSETS.IMAGE.GET("HOME")} alt={""} />
            </NavLink>

            <NavLink className={cn(s.headerLink, {[s.headerLink_active]: path.includes(ROUTES.USER.PERSONAL.ROOT())})} to={ROUTES.USER.PERSONAL.ROOT()}>
                <p className={s.headerLink__label}>Мои задачи</p>
                <img className={s.headerLink__image} src={ASSETS.IMAGE.GET("TASK")} alt={""} />
            </NavLink>

            <NavLink className={cn(s.headerLink, {[s.headerLink_active]: path.includes(ROUTES.USER.SPACE.ROOT())})} to={ROUTES.USER.SPACE.ROOT()}>
                <p className={s.headerLink__label}>Пространства</p>
                <img className={s.headerLink__image} src={ASSETS.IMAGE.GET("SPACES")} alt={""} />
            </NavLink>

            <div className={s.header__line} />

            <div className={s.header__line} />

            <NavLink className={cn(s.headerLink, {[s.headerLink_active]: path.includes(ROUTES.USER.SETTINGS.ROOT())})} to={ROUTES.USER.SETTINGS.ROOT()}>
                <p className={s.headerLink__label}>Настройки</p>
                <img className={s.headerLink__image} src={ASSETS.IMAGE.GET("SETTINGS")} alt={""} />
            </NavLink>

            <button type={"button"} className={s.headerLink} onClick={onLogout} >
                <p className={s.headerLink__label}>Выход</p>
                <img className={s.headerLink__image} src={ASSETS.IMAGE.GET("LOGOUT")} alt={""} />
            </button>
        </div>
    );
};