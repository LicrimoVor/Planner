
export const ROUTES = {
    /** Корневой путь роутера */
    ROOT: "/",

    /** Все остальные пути относительно данного url (только для роутера) */
    OTHER: (root?: string) => (root ?? ROUTES.ROOT) + "*",

    /** 404 */
    NOT_FOUND: () => ROUTES.ROOT + "not-found/",

    /** Аутентификация */
    AUTH: {
        ROOT: () => ROUTES.ROOT,

        /** Авторизация */
        LOGIN: {
            ROOT: () => ROUTES.AUTH.ROOT() + "login/",
        },

        /** Регистрация */
        REGISTRATION: {
            ROOT: () => ROUTES.AUTH.ROOT() + "registration/",
        },

        /** Восстановление пароля */
        RECOVERY: {
            /** Заявка на восстановление */
            ROOT: () => ROUTES.AUTH.ROOT() + "recovery/",

            /** Изменение пароля */
            CHANGE: (isMask: boolean = true, uid: string = "", token: string = "") =>
                ROUTES.AUTH.RECOVERY.ROOT() + (isMask ? ":uid/:token/" : `${uid}/${token}/`)
        },
    },

    /** Регистрация */
    USER: {
        ROOT: () => ROUTES.ROOT,

        /** Профиль пользователя */
        PROFILE: {
            ROOT: () => ROUTES.USER.ROOT() + "profile/",
        },

        /** Настройки аккаунта */
        SETTINGS: {
            ROOT: () => ROUTES.USER.ROOT() + "settings/",

            /** Изменение пароля */
            CHANGE_PASSWORD: () => ROUTES.USER.SETTINGS.ROOT() + "password/"
        },

        /** Персональные задачи */
        PERSONAL: {
            ROOT: () => ROUTES.USER.ROOT() + "personal/",
        },

        /** Пространства */
        SPACE: {
            /** Список пространств пользователя */
            ROOT: () => ROUTES.USER.ROOT() + "space/",

            CREATE: () => ROUTES.USER.SPACE.ROOT() + "create/",

            ID: (spaceId?: number) => ROUTES.USER.SPACE.ROOT() + `${spaceId ?? ":spaceId"}/`,

            /** Список задач пространства */
            TASK: (spaceId?: number) => ROUTES.USER.SPACE.ID(spaceId) + "task/",

            /** Настройки пространства */
            SETTINGS: (spaceId?: number) => ROUTES.USER.SPACE.ID(spaceId) + "settings/",
        }
    },
}

export const ROUTER_URL = {
    ROOT: "/",
    ERROR_404: "/404",

    LOGIN: "/login",
    REGISTRATION: "/registration",
    RECOVERY: "/recovery",

    PERSONAL: "/personal",
    PROFILE: "/profile",
    SPACES: {
        ROOT: "/spaces",
        TASK: (id: number) => `${ROUTER_URL.SPACES.ROOT}/${id}/task`,
        SETTINGS: (id: number) => `${ROUTER_URL.SPACES.ROOT}/${id}/settings`
    },
    SETTINGS: "/settings",
    CHANGE_PASSWORD: "/settings/password",
};