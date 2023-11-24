import React from 'react';
import {Form, FormLabel, FormInput, FormReference, FormSubmit} from "@shared/ui";
import {ROUTES} from "@shared/config";
import {useFormTextField, useForm} from "@shared/hooks";
import {CommonValidator} from "@shared/lib";
import {TextField} from "@shared/types";
import {AuthRepository} from "@entities/session";

const validators = [
    CommonValidator.required(),
    CommonValidator.specialChars()
];

export const LoginForm = () => {
    const username = useFormTextField("username", validators);
    const password = useFormTextField("password", validators);

    const form = useForm<TextField, void, string>({
        fields: [username, password],
        apiCall: async () => await AuthRepository.login({
            login: username.value,
            password: password.value
        }),
        defaultError: ""
    });

    return (
        <Form onSubmit={form.handleFormSubmit} center>
            <FormInput type={"text"} placeholder={"Введите логин или почту..."} mask={""}
                       header={"Логин или электронная почта"}
                       onChange={username.handleChange}
                       error={username.error}
            />
            <FormInput type={"password"} placeholder={"Введите пароль..."} mask={""}
                       header={"Пароль"}
                       onChange={password.handleChange}
                       error={password.error}
            />

            <FormReference to={ROUTES.AUTH.RECOVERY.ROOT()}>Забыли пароль?</FormReference>

            <FormLabel error>{form.sendingError}</FormLabel>
            <FormSubmit>Войти</FormSubmit>
            <FormReference to={ROUTES.AUTH.REGISTRATION.ROOT()}>Перейти к регистрации</FormReference>
        </Form>
    );
};