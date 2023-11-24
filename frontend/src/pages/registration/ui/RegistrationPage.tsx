import React from 'react';
import {AuthHeader, ContentLayout} from "@shared/ui";
import {RegistrationForm, SocialAuth} from "@widgets";

export const RegistrationPage = () => {
    return (
        <ContentLayout center>
            <AuthHeader>
                Добро пожаловать!
                <br/>
                <span>Пройдите регистрацию для доступа к сервису</span>
            </AuthHeader>

            <RegistrationForm />

            <SocialAuth />
        </ContentLayout>
    );
};