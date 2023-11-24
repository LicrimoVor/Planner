import React from 'react';
import {SocialButton} from "@shared/ui";
import {ASSETS} from "@shared/config";
import {SocialService} from "@features/social_service/api";

const Google = (props: any) => {
    const onClick = async () => {
        await SocialService.google();
    };

    return (
        <SocialButton src={ASSETS.SOCIAL.GET("GOOGLE")} onClick={onClick} {...props}>
            Google
        </SocialButton>
    );
};

export default Google;