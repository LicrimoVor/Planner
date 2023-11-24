import React from 'react';
import {ContentLayout} from "@shared/ui";
import {ChangePasswordForm} from "@widgets/change_password_form";

export const ChangePasswordPage = () => {
    return (
        <ContentLayout center>
            <ChangePasswordForm />
        </ContentLayout>
    );
};