import React from 'react';
import {SocialButton} from "@shared/ui";
import {ASSETS} from "@shared/config";
import {SocialService} from "@features/social_service/api";

const Yandex = (props: any) => {
    const onClick = async () => {
        await SocialService.yandex();
    };

    return (
        <SocialButton src={ASSETS.SOCIAL.GET("YANDEX")} onClick={onClick} {...props}>
            Яндекс ID
        </SocialButton>
    );
};

export default Yandex;