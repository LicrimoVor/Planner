import React from 'react';
import {Form, FormLabel, FormInput, FormReference, FormSubmit} from "@shared/ui";
import {ROUTES} from "@shared/config";
import {useForm, useFormTextField} from "@shared/hooks";
import {CommonValidator} from "@shared/lib";
import {TextField} from "@shared/types";
import {AuthRepository} from "@entities/session";

export const RecoveryForm = () => {
    const email = useFormTextField("email", [CommonValidator.required()]);

    const form = useForm<TextField, void, string>({
        fields: [email],
        apiCall: async () => await AuthRepository.recoveryPassword({
            email: email.value
        }),
        defaultError: "",
        defaultSuccessMessage: "На почту отправлено письмо для восстановления"
    });

    return (
        <Form onSubmit={form.handleFormSubmit} center>
            <FormInput type={"text"} placeholder={"Введите почту..."} mask={""}
                       header={"Электронная почта"}
                       onChange={email.handleChange}
                       error={email.error}
            />

            {!!form.successMessage.length && (
                <FormLabel success>{form.successMessage}</FormLabel>
            )}

            {!!form.sendingError.length && (
                <FormLabel error>{form.sendingError}</FormLabel>
            )}

            <FormSubmit>Восстановить</FormSubmit>
            <FormReference to={ROUTES.AUTH.LOGIN.ROOT()}>Вернуться к авторизации</FormReference>
        </Form>
    );
};