import React, {ChangeEvent, FC, useCallback, useEffect, useRef, useState} from 'react';
import {
    Form,
    FormColorPicker,
    FormImage,
    FormInput,
    FormLabel,
    FormReference,
    FormSubmit,
    LoaderHandler
} from "@shared/ui";
import {IUser, UserRepository, userStore} from "@entities/user";
import {ASSETS, ROUTES} from "@shared/config";
import {useDebounce, useForm, useFormTextField} from "@shared/hooks";
import {CommonValidator} from "@shared/lib";
import {useFormImageField} from "@shared/hooks/form/use-form-image-field";
import {TextField} from "@shared/types/form";
import {ISpace, SpaceRepository} from "@entities/space";
import {useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {apiInstance, IPaginatorResponse} from "@shared/api";

import s from "./styles.module.scss";

const validators = [
    CommonValidator.required(),
    CommonValidator.specialChars(),
];

type SpaceSettingsFormProps = {
    space: ISpace;
}

export const SpaceSettingsForm: FC<SpaceSettingsFormProps> = (props) => {
    const {space} = props;

    const profile = userStore.useProfile()!;

    const queryClient = useQueryClient();
    const {
        mutateAsync
    } = SpaceRepository.update(space.id, queryClient);

    const name = useFormTextField("name", validators, space.name);
    const avatar = useFormImageField("avatar", []);

    const form = useForm<TextField, void, string>({
        fields: [name],
        apiCall: async () => {
            await mutateAsync({
                name: name.value,
                avatar: avatar.value || undefined
            })
        },
        defaultError: "",
        defaultSuccessMessage: "Пространство успешно изменено!"
    });

    const [responsibleSearch, setResponsibleSearch] = useState("");
    const searchDebounced = useDebounce<string>({
        value: responsibleSearch,
        delay: 1500
    });
    const searchData = UserRepository.search(searchDebounced);
    // const [searchData, setSearchData] = useState<UseQueryResult<IPaginatorResponse<IUser>, Error>>();

    // const searchHandler = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    //     setResponsibleSearch(e.target.value);
    //     const response = UserRepository.search(e.target.value);
    //     setSearchData(response);
    // }, []);

    console.log(searchData);

    return (
        <Form onSubmit={form.handleFormSubmit} center wide>
            <FormInput type={"text"} placeholder={"Введите имя пространства..."} mask={""}
                       header={"Название"}
                       onChange={name.handleChange}
                       error={name.error}
                       defaultValue={name.value}
            />

            <FormImage
                header={"Загрузите аватар"}
                src={avatar.value || apiInstance.getMedia(space.avatar)}
                onChange={avatar.handleChange}
            />

            <FormReference to={ROUTES.USER.SPACE.TASK(space.id)}>Перейти к задачам</FormReference>

            {
                !!form.successMessage.length && (
                    <FormLabel success>{form.successMessage}</FormLabel>
                )
            }

            <FormSubmit>Изменить</FormSubmit>
            <FormReference to={ROUTES.USER.SPACE.ROOT()}>Вернуться к списку</FormReference>

            <div className={s.spaceResponsibles}>
                <p className={s.spaceResponsibles__title}>Участники пространства</p>

                <FormInput
                    header={"Поиск участников"}
                    type={"text"}
                    mask={""}
                    placeholder={"Введите логин для поиска..."}
                    onChange={(e) => setResponsibleSearch(e.target.value)}
                />

                <div className={s.spaceResponsiblesList}>
                    {
                        responsibleSearch.length ? ((!searchData.isSuccess || searchData.isLoading) ? (
                            <LoaderHandler isLoaded={false} />
                        ) : (
                            searchData.isSuccess && (
                                searchData.data.results.map((user, index) => (
                                    <div key={index} className={s.spaceResponsiblesItem}>
                                        <p
                                            className={s.spaceResponsiblesItem__id}
                                        >{index + 1}.</p>
                                        <div className={s.spaceResponsiblesItemInfo}>
                                            <p
                                                className={s.spaceResponsiblesItemInfo__username}
                                                style={{color: user.color}}
                                            >{user.username}</p>
                                            <p
                                                className={s.spaceResponsiblesItemInfo__name}
                                            >{user.first_name} {user.last_name}</p>
                                        </div>
                                        {
                                            user.id !== profile.user.id && (
                                                space.staff.map(staff => staff.id).includes(user.id) ? (
                                                    <img
                                                        src={ASSETS.IMAGE.GET("CLEAR")}
                                                        className={s.spaceResponsiblesItem__button}
                                                        title={"Исключить"}
                                                        alt={"Исключить"}
                                                        onClick={async () => {
                                                            await mutateAsync({
                                                                staff: space.staff
                                                                    .map(staff => staff.id)
                                                                    .filter(staff => staff !== user.id)
                                                            })
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        src={ASSETS.IMAGE.GET("PLUS")}
                                                        className={s.spaceResponsiblesItem__button}
                                                        title={"Добавить"}
                                                        alt={"Добавить"}
                                                        onClick={async () => {
                                                            await mutateAsync({
                                                                staff: [...space.staff.map(staff => staff.id), user.id]
                                                            })
                                                        }}
                                                    />
                                                )
                                            )
                                        }
                                    </div>
                                ))
                            )
                        )) : (
                            <React.Fragment>
                                {
                                    space.staff.map((user, index) => (
                                        <div key={index} className={s.spaceResponsiblesItem}>
                                            <p
                                                className={s.spaceResponsiblesItem__id}
                                            >{index + 1}.</p>
                                            <div className={s.spaceResponsiblesItemInfo}>
                                                <p
                                                    className={s.spaceResponsiblesItemInfo__username}
                                                    style={{color: user.color}}
                                                >{user.username}</p>
                                                <p
                                                    className={s.spaceResponsiblesItemInfo__name}
                                                >{user.first_name} {user.last_name}</p>
                                            </div>
                                            {
                                                user.id !== profile.user.id && (
                                                    <img
                                                        src={ASSETS.IMAGE.GET("CLEAR")}
                                                        className={s.spaceResponsiblesItem__button}
                                                        title={"Исключить"}
                                                        alt={"Исключить"}
                                                        onClick={async () => {
                                                            await mutateAsync({
                                                                staff: space.staff
                                                                    .map(staff => staff.id)
                                                                    .filter(staff => staff !== user.id)
                                                            })
                                                        }}
                                                    />
                                                )
                                            }
                                        </div>
                                    ))
                                }
                            </React.Fragment>
                        )
                    }
                </div>
            </div>
        </Form>
    );
};