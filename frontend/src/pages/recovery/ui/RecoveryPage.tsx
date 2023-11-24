import React, {FC} from 'react';
import {AuthHeader, ContentLayout} from "@shared/ui";
import {SocialAuth} from "@widgets";
import {RecoveryForm} from "@widgets/auth/recovery_form";
import {RecoveryPasswordForm} from "@widgets/auth/recovery_password_form";

type RecoveryPageProps = {
    /**
     * Нужна ли форма для смены пароля
     */
    change?: boolean;
}

export const RecoveryPage: FC<RecoveryPageProps> = (props) => {
    const {change} = props;

    return (
        <ContentLayout center>
            <AuthHeader>
                {change ? "Восстановление пароля" : "Забыли пароль?"}
                <br/>
                <span>
                    {
                        change ?
                        "Придумайте новый пароль для своего аккаунта" :
                        "Восстановите аккаунт с помощью электронной почты"
                    }
                </span>
            </AuthHeader>

            {
                change ? (<RecoveryPasswordForm />) : (<RecoveryForm />)
            }

            <SocialAuth />
        </ContentLayout>
    );
};