import React from 'react';
import {ContentLayout} from "@shared/ui";
import {PersonalTaskTable} from "@widgets";

export const PersonalPage = () => {
    return (
        <ContentLayout hCenter>
            <PersonalTaskTable />
        </ContentLayout>
    );
};