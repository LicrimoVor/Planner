import Cookies from "js-cookie";
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface ISessionState {
    session: string | null;

    setUser: (session: string | null) => void;
    removeUser: () => void;
}

class SessionStore {
    private readonly store;

    constructor() {
        this.store = create<ISessionState>()(
            persist(
                (set, get) => ({
                    session: null,

                    setUser: (session: string | null) => {
                        set({session: session});
                    },

                    removeUser: () => {
                        set({session: null});
                    }
                }),
                {
                    name: "sessionStorage",
                    onRehydrateStorage: () => state => {
                        const session = Cookies.get("sessionid");

                        if(state?.session) {
                            state.setUser(session || null);
                        }

                        console.log("rehydrate", state);
                    }
                }
            )
        );
    }

    useSession = () => this.store(state => !!state.session);
    setUser = (session: string | null) => this.store.getState().setUser(session);
    removeUser = () => this.store.getState().removeUser();
}

export const sessionStore = new SessionStore();