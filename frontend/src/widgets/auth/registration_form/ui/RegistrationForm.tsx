import React from 'react';
import {Form, FormInput, FormReference, FormSubmit} from "@shared/ui";
import {ROUTES} from "@shared/config";
import {useForm, useFormTextField} from "@shared/hooks";
import {AuthValidator, CommonValidator} from "@shared/lib";
import {TextField} from "@shared/types";
import {AuthRepository} from "@entities/session";
import {ResponseErrorData} from "@shared/api";

const validators = [
    CommonValidator.required(),
    CommonValidator.specialChars(),
    CommonValidator.maxLength(255)
];

export const RegistrationForm = () => {
    const username =
        useFormTextField("username", [...validators, AuthValidator.username()]);
    const firstName =
        useFormTextField("first_name", [...validators, AuthValidator.realName()]);
    const lastName =
        useFormTextField("last_name", [...validators, AuthValidator.realName()]);
    const email = useFormTextField("email", [
        ...validators,
    ]);
    const password =
        useFormTextField("password", [...validators]);
    const confirmPassword = useFormTextField("confirm_password", [
        ...validators,
        CommonValidator.isEqualTo({equalTo: password.value, message: "Пароли должны совпадать"})
    ]);

    const form = useForm<TextField, void, ResponseErrorData>({
        fields: [username, firstName, lastName, email, password, confirmPassword],
        apiCall: async () => await AuthRepository.registration({
            username: username.value,
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            password: password.value
        }),
        onFailure: (error) => {

        },
        defaultError: {}
    });

    return (
        <Form onSubmit={form.handleFormSubmit} center wide>
            <FormInput type={"text"} placeholder={"Введите имя..."} mask={""}
                       header={"Имя"}
                       onChange={firstName.handleChange}
                       error={firstName.error}
            />
            <FormInput type={"text"} placeholder={"Введите логин..."} mask={""}
                       header={"Логин"}
                       onChange={username.handleChange}
                       error={username.error}
            />
            <FormInput type={"text"} placeholder={"Введите фамилию..."} mask={""}
                       header={"Фамилия"}
                       onChange={lastName.handleChange}
                       error={lastName.error}
            />
            <FormInput type={"password"} placeholder={"Введите пароль..."} mask={""}
                       header={"Пароль"}
                       onChange={password.handleChange}
                       error={password.error}
            />
            <FormInput type={"text"} placeholder={"Введите почту..."} mask={""}
                       header={"Электронная почта"}
                       onChange={email.handleChange}
                       error={email.error}
            />
            <FormInput type={"password"} placeholder={"Повторите пароль..."} mask={""}
                       header={"Подтвердите пароль"}
                       onChange={confirmPassword.handleChange}
                       error={confirmPassword.error}
            />

            <FormSubmit>Регистрация</FormSubmit>
            <FormReference to={ROUTES.AUTH.LOGIN.ROOT()}>Перейти к авторизации</FormReference>
        </Form>
    );
};