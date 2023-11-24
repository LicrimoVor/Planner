import React, {FC, PropsWithChildren} from 'react';
import {Spinner} from "@shared/ui/spinner";
import {ContentLayout} from "@shared/ui";

type LoaderHandlerProps = PropsWithChildren<{
    isLoaded: boolean;
}>;

export const LoaderHandler: FC<LoaderHandlerProps> = (props) => {
    const {children, isLoaded} = props;

    if(!isLoaded) {
        return (
            <ContentLayout center>
                <Spinner />
            </ContentLayout>
        );
    }

    return (
        <React.Fragment>{children}</React.Fragment>
    );
};