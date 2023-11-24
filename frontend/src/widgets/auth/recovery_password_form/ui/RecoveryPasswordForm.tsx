import React from 'react';
import {Form, FormLabel, FormInput, FormReference, FormSubmit} from "@shared/ui";
import {ROUTES} from "@shared/config";
import {useForm, useFormTextField} from "@shared/hooks";
import {CommonValidator} from "@shared/lib";
import {TextField} from "@shared/types";
import { useParams } from 'react-router-dom';
import {AuthRepository} from "@entities/session";

const validators = [CommonValidator.required(), CommonValidator.specialChars()];

export const RecoveryPasswordForm = () => {
    const {uid, token} = useParams();

    const password = useFormTextField("password", validators);
    const confirmPassword = useFormTextField("confirmPassword", [
        ...validators,
        CommonValidator.isEqualTo({
            equalTo: password.value,
            message: "Пароли должны совпадать"
        })
    ]);

    const form = useForm<TextField, void, string>({
        fields: [password, confirmPassword],
        apiCall: async () => await AuthRepository.recoveryPasswordConfirm({
            uid: uid!,
            token: token!,
            new_password: password.value
        }),
        defaultError: "",
        defaultSuccessMessage: "Вы успешно изменили пароль!"
    });

    return (
        <Form onSubmit={(e) => {!form.successMessage.length && form.handleFormSubmit(e)}} center>
            <FormInput type={"password"} placeholder={"Введите новый пароль..."} mask={""}
                       header={"Новый пароль"}
                       onChange={password.handleChange}
                       error={password.error}
            />

            <FormInput type={"password"} placeholder={"Повторите новый пароль..."} mask={""}
                       header={"Подтверждение пароля"}
                       onChange={confirmPassword.handleChange}
                       error={confirmPassword.error}
            />

            {!!form.successMessage.length && (
                <FormLabel success>{form.successMessage}</FormLabel>
            )}

            {!!form.sendingError.length && (
                <FormLabel error>{form.sendingError}</FormLabel>
            )}

            <FormSubmit>Изменить</FormSubmit>
            <FormReference to={ROUTES.AUTH.LOGIN.ROOT()}>Вернуться к авторизации</FormReference>
        </Form>
    );
};