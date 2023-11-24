import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse, InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import {SERVER_URL} from "@shared/config";
import {sessionStore} from "@entities/session";

class ApiInstance {
    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            withCredentials: true,
            baseURL: SERVER_URL.API.ROOT(),
            headers: {
                "Content-Type": "application/json",
            },
            xsrfHeaderName: "X-CSRFToken"
        });

        this.axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
            const method = config.method!.toLowerCase();
            if(method === "post" || method === "patch" || method === "delete") {
                const token = Cookies.get("csrftoken");
                if(token) {
                    config.headers.set(config.xsrfHeaderName, token);
                }
            }

            return config;
        });

        this.axios.interceptors.response.use((response: AxiosResponse) => {
            return response;
        }, (error: AxiosError) => {
            if(error.response?.status === 401) {
                sessionStore.removeUser(); // КОСТЫЛЬ! НЕЛЬЗЯ БИЗНЕС ЛОГИКУ СЮДА ПИХАТЬ

                if(Cookies.get("sessionid")) {
                    Cookies.remove("sessionid");
                }
                if(Cookies.get("csrftoken")) {
                    Cookies.remove("csrftoken");
                }
            }

            throw error;
        });
    }

    async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.get(
                endpoint,
                options
            );
            return response.data;
        }
        catch (error) {
            throw {
                status: (error as AxiosError)?.response?.status,
                data: (error as AxiosError)?.response?.data
            };
        }
    }

    async post<T>(endpoint: string, data: any, options: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.post(
                endpoint,
                data,
                options
            );

            return response.data;
        }
        catch (error) {
            throw (error as AxiosError)?.response?.data;
        }
    }

    async patch<T>(endpoint: string, data: any, options: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.patch(
                endpoint,
                data,
                options
            );
            return response.data;
        }
        catch (error) {
            throw (error as AxiosError)?.response?.data;
        }
    }

    async delete<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axios.delete(
                endpoint,
                options
            );
            return response.data;
        }
        catch (error) {
            throw (error as AxiosError)?.response?.data;
        }
    }

    async redirect(endpoint: string): Promise<void> {
        window.location.href = SERVER_URL.API.ROOT() + endpoint;
    }

    getMedia(url: string): string {
        return SERVER_URL.MEDIA.ROOT() + url;
    }
}

export const apiInstance = new ApiInstance();