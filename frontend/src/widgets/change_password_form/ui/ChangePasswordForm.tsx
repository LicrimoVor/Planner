import React, {useState} from 'react';
import {Form, FormInput, FormLabel, FormReference, FormSubmit} from "@shared/ui";
import {ROUTES} from "@shared/config";
import {useForm, useFormTextField} from "@shared/hooks";
import {CommonValidator} from "@shared/lib";
import {TextField} from "@shared/types";
import {ResponseErrorData} from "@shared/api";
import {userStore} from "@entities/user";

const validators = [
    CommonValidator.required(),
    CommonValidator.specialChars()
];

export const ChangePasswordForm = () => {
    const password = useFormTextField("current_password", validators);
    const newPassword = useFormTextField("new_password", [
        ...validators,
        CommonValidator.isEqualTo({
            equalTo: password.value,
            message: "Пароль не должен совпадать со старым",
            reverse: true
        })
    ]);
    const confirmPassword = useFormTextField("confirm_password", [
        ...validators,
        CommonValidator.isEqualTo({
            equalTo: newPassword.value,
            message: "Пароль должен совпадать"
        })
    ]);
    const form = useForm<TextField, void, ResponseErrorData>({
        fields: [password, confirmPassword, newPassword],
        apiCall: async () => await userStore.setPassword({
            current_password: password.value,
            new_password: newPassword.value
        }),
        defaultError: {},
        defaultSuccessMessage: "Пароль успешно изменен!"
    });

    return (
        <Form onSubmit={form.handleFormSubmit} center>
            <FormInput type={"password"} placeholder={"Введите текущиий пароль..."} mask={""}
                       header={"Текущий пароль"}
                       onChange={password.handleChange}
                       error={password.error}
            />
            <FormInput type={"password"} placeholder={"Введите новый пароль..."} mask={""}
                       header={"Новый пароль"}
                       onChange={newPassword.handleChange}
                       error={newPassword.error}
            />
            <FormInput type={"password"} placeholder={"Повторите новый пароль..."} mask={""}
                       header={"Подтверждение пароля"}
                       onChange={confirmPassword.handleChange}
                       error={confirmPassword.error}
            />

            {
                !!form.successMessage.length && (
                    <FormLabel success>{form.successMessage}</FormLabel>
                )
            }

            <FormSubmit>Изменить</FormSubmit>
            <FormReference to={ROUTES.USER.SETTINGS.ROOT()}>Вернуться к настройкам</FormReference>
        </Form>
    );
};