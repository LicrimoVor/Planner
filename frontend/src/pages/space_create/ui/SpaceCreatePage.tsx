import React from 'react';
import {ContentLayout} from "@shared/ui";
import {SpaceCreateForm} from "@widgets/space_create_form";

export const SpaceCreatePage = () => {
    return (
        <ContentLayout hCenter vCenter>
            <SpaceCreateForm />
        </ContentLayout>
    );
};