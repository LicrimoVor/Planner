import {IProfile, IUser, UserPasswordDto, UserService, UserUpdateDto} from "@entities/user";
import {create} from "zustand";
import {sessionStore} from "@entities/session";
import Cookies from "js-cookie";
import {apiInstance, IPaginatorResponse, ResponseErrorData, ResponseErrorHandler} from "@shared/api";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";

interface UserState {
    profile: IProfile | null;

    getMe: () => Promise<void>;
    update: (profile: UserUpdateDto) => Promise<void>;
    setPassword: (passwordDto: UserPasswordDto) => Promise<void>;

    getAvatar: () => string | null;
}

class UserStore {
    private readonly store;

    constructor() {
        this.store = create<UserState>((set, get) => ({
            profile: null,

            getMe: async () => {
                set({profile: null});

                try {
                    const response = await UserService.getMe();
                    await new Promise(resolve => setTimeout(resolve, 500));
                    sessionStore.setUser(Cookies.get("sessionid")!);
                    set({profile: response});
                }
                catch (error: any) {
                    if(error?.status === 401) {
                        sessionStore.removeUser();
                    }
                }
            },

            update: async (profile: UserUpdateDto) => {
                try {
                    const response = await UserService.update(profile);

                    set({profile: response});
                }
                catch (error: any) {
                    throw new ResponseErrorHandler(error as ResponseErrorData);
                }
            },

            setPassword: async(passwordDto: UserPasswordDto) => {
                try {
                    await UserService.setPassword(passwordDto);
                    sessionStore.removeUser();
                }
                catch (error: any) {
                    throw new ResponseErrorHandler(error as ResponseErrorData);
                }
            },

            getAvatar: () => {
                if(!get().profile?.avatar) {
                    return null;
                }

                return apiInstance.getMedia(get().profile!.avatar!);
            }
        }));
    }

    useProfile = () => this.store(state => state.profile);

    getMe = () => this.store.getState().getMe();
    update = (profile: UserUpdateDto) => this.store.getState().update(profile);
    setPassword = (passwordDto: UserPasswordDto) => this.store.getState().setPassword(passwordDto);

    getAvatar = () => this.store.getState().getAvatar();
}

export const userStore = new UserStore();