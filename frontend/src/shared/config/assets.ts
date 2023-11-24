
export const ASSETS = {
    ROOT: "/assets/",

    IMAGE: {
        ROOT: () => ASSETS.ROOT + "img/",

        GET: (key: keyof typeof ASSETS_DATA.IMAGES) => ASSETS.IMAGE.ROOT() + ASSETS_DATA.IMAGES[key]
    },

    SOCIAL: {
        ROOT: () => ASSETS.ROOT + "social/",

        GET: (key: keyof typeof ASSETS_DATA.SOCIAL) => ASSETS.SOCIAL.ROOT() + ASSETS_DATA.SOCIAL[key]
    },
}

const ASSETS_DATA = {
    IMAGES: {
        LOGOTYPE: "logotype.svg",
        SPINNER: "spinner2.svg",
        BACKGROUND: "bg.svg",

        ACCOUNT: "account.svg",
        HOME: "home.svg",
        TASK: "task.svg",
        SPACES: "spaces.svg",
        SETTINGS: "settings.svg",
        LOGOUT: "logout.svg",

        EXPAND: "expand.svg",
        PLUS: "plus.svg",
        EDIT: "edit.svg",
        CLEAR: "clear.svg",
    },

    SOCIAL: {
        VK: "vk.svg",
        GOOGLE: "google.svg",
        YANDEX: "yandex.svg",
        MAIL: "mail.svg",
    }
}