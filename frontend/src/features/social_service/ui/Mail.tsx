import React from 'react';
import {SocialButton} from "@shared/ui";
import {ASSETS} from "@shared/config";
import {SocialService} from "@features/social_service/api";

const Mail = (props: any) => {
    const onClick = async () => {
        await SocialService.mail();
    };

    return (
        <SocialButton src={ASSETS.SOCIAL.GET("MAIL")} onClick={onClick} {...props}>
            Mail.ru
        </SocialButton>
    );
};

export default Mail;