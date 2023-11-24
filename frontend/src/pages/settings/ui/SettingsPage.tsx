import React from 'react';
import {ContentLayout} from "@shared/ui";
import {SettingsForm} from "@widgets/settings_form/ui/SettingsForm";

export const SettingsPage = () => {
    return (
        <ContentLayout center>
            <SettingsForm />
        </ContentLayout>
    );
};