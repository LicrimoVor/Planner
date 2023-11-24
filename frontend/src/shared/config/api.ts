
const DEV = true;

export const SERVER_URL = {
    // ROOT: DEV ? "http://localhost:7000/" : "https://digitalplaner.ddns.net/",
    ROOT: DEV ? "http://localhost/" : "https://digitalplaner.ddns.net/",

    API: {
        ROOT: () => SERVER_URL.ROOT + "api/",
    },

    MEDIA: {
        ROOT: () => SERVER_URL.ROOT + "media/"
    }
}