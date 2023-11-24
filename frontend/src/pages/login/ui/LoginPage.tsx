import React from 'react';
import {AuthHeader, ContentLayout, FormReference, FormSubmit} from "@shared/ui";
import {LoginForm, SocialAuth} from "@widgets";
import {ROUTES} from "@shared/config";

export const LoginPage = () => {
    return (
        <ContentLayout center>
            <AuthHeader>
                Добро пожаловать!
                <br/>
                <span>Авторизуйтесь для доступа к сервису</span>
            </AuthHeader>

            <LoginForm />

            <SocialAuth />
        </ContentLayout>
    );
};