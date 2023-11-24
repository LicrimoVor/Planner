import { SocialService } from '@features';
import React from 'react';

import s from "./styles.module.scss";

export const SocialAuth = () => {
    return (
        <div className={s.socialAuth}>
            <p className={s.socialAuth__title}>Войти с помощью</p>

            <div className={s.socialAuthContainer}>
                <SocialService.Vk className={s.socialAuthContainer__service} />
                <SocialService.Google className={s.socialAuthContainer__service} />
                <SocialService.Yandex className={s.socialAuthContainer__service} />
                <SocialService.Mail className={s.socialAuthContainer__service} />
            </div>
        </div>
    );
};