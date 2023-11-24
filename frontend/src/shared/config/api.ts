
const DEV = false;

export const SERVER_URL = {
    ROOT: DEV ? "http://localhost:7000/" : "https://digitalplaner.ddns.net/",

    API: {
        ROOT: () => SERVER_URL.ROOT + "api/",
    },

    MEDIA: {
        ROOT: () => SERVER_URL.ROOT + "media/"
    }
}