import React, {useState} from 'react';
import {useForm, useFormTextField} from "@shared/hooks";
import {AuthValidator, CommonValidator} from "@shared/lib";
import {TextField} from "@shared/types";
import {ResponseErrorData} from "@shared/api";
import {UserService, userStore} from "@entities/user";
import {Form, FormColorPicker, FormImage, FormInput, FormLabel, FormReference, FormSubmit} from "@shared/ui";
import {ROUTES} from "@shared/config";
import {useFormImageField} from "@shared/hooks/form/use-form-image-field";

const validators = [
    CommonValidator.required(),
    CommonValidator.specialChars()
];

export const SettingsForm = () => {
    const profile = userStore.useProfile()!;

    const username = useFormTextField("username", validators, profile.user.username);
    const firstName = useFormTextField("first_name", [
        ...validators,
        AuthValidator.realName()
    ], profile.user.first_name);
    const lastName = useFormTextField("last_name", [
        ...validators,
        AuthValidator.realName()
    ], profile.user.last_name);
    const email = useFormTextField("email", validators, profile.user.email);
    const [color, setColor] = useState(profile.color);
    const avatar = useFormImageField("avatar", []);

    const form = useForm<TextField, void, ResponseErrorData>({
        fields: [username, firstName, lastName],
        apiCall: async () => await userStore.update({
            username: username.value,
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            color: color.toUpperCase(),
            avatar: avatar.value || undefined,
        }),
        defaultError: {},
        defaultSuccessMessage: "Данные успешно изменены!"
    });

    const onTelegram = async () => {
        const response = await UserService.getTelegram();

        window.location.href = response.url_telegram;
    };

    return (
        <Form onSubmit={form.handleFormSubmit} center wide>
            <FormInput type={"text"} placeholder={"Введите имя..."} mask={""}
                       header={"Имя"}
                       onChange={firstName.handleChange}
                       error={firstName.error}
                       defaultValue={firstName.value}
            />
            <FormInput type={"text"} placeholder={"Введите логин..."} mask={""}
                       header={"Логин"}
                       onChange={username.handleChange}
                       error={username.error}
                       defaultValue={username.value}
            />
            <FormInput type={"text"} placeholder={"Введите фамилию..."} mask={""}
                       header={"Фамилия"}
                       onChange={lastName.handleChange}
                       error={lastName.error}
                       defaultValue={lastName.value}
            />
            <FormInput type={"text"} placeholder={"Введите почту..."} mask={""}
                       header={"Электронная почта"}
                       onChange={email.handleChange}
                       error={email.error}
                       defaultValue={email.value}
            />

            <FormImage
                header={"Загрузите аватар"}
                src={avatar.value || userStore.getAvatar()!}
                onChange={avatar.handleChange}
            />

            <FormColorPicker
                defaultColor={color}
                header={"Цвет профиля"}
                onChange={(e) => setColor(e.hex)}
            />

            <FormReference to={""} onClick={onTelegram}>Привязать телеграмм</FormReference>

            {
                !!form.successMessage.length && (
                    <FormLabel success>{form.successMessage}</FormLabel>
                )
            }

            <FormSubmit>Изменить</FormSubmit>
            <FormReference to={ROUTES.USER.SETTINGS.CHANGE_PASSWORD()}>Изменить пароль</FormReference>
        </Form>
    );
};