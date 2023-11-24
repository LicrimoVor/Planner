import React from 'react';
import {useForm, useFormTextField} from "@shared/hooks";
import {CommonValidator} from "@shared/lib";
import {TextField} from "@shared/types";
import {Form, FormInput, FormLabel, FormReference, FormSubmit} from "@shared/ui";
import {ROUTES} from "@shared/config";
import {ISpace, SpaceRepository} from "@entities/space";
import {userStore} from "@entities/user";
import { redirect, useNavigate } from 'react-router-dom';
import {apiInstance} from "@shared/api";

const validators = [
    CommonValidator.required(),
    CommonValidator.specialChars(),
];

export const SpaceCreateForm = () => {
    const profile = userStore.useProfile()!;
    const navigation = useNavigate();

    const name = useFormTextField("name", validators);

    const form = useForm<TextField, ISpace, string>({
        fields: [name],
        apiCall: async () => await SpaceRepository.create({
            name: name.value,
            staff: [profile.user.id]
        }),
        onSuccess: (space) => {
            navigation(ROUTES.USER.SPACE.SETTINGS(space.id));
        },
        defaultError: ""
    })

    return (
        <Form onSubmit={form.handleFormSubmit} center>
            <FormInput type={"text"} placeholder={"Введите имя пространства..."} mask={""}
                       header={"Название"}
                       onChange={name.handleChange}
                       error={name.error}
            />

            <FormLabel error>{form.sendingError}</FormLabel>
            <FormSubmit>Создать</FormSubmit>
            <FormReference to={ROUTES.USER.SPACE.ROOT()}>Вернуться к списку</FormReference>
        </Form>
    );
};