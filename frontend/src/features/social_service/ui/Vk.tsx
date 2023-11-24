import React from 'react';
import {SocialButton} from "@shared/ui";
import {ASSETS} from "@shared/config";
import {SocialService} from "../api";

const Vk = (props: any) => {
    const onClick = async () => {
        await SocialService.vk();
    };

    return (
        <SocialButton src={ASSETS.SOCIAL.GET("VK")} onClick={onClick} {...props}>
            ВКонтакте
        </SocialButton>
    );
};

export default Vk;