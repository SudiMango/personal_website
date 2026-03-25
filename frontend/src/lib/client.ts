import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "/api";

const apiClient = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any>) => {
        const status = error.response?.status;

        if (status && status >= 500) {
            toast.error("Server error. Try again later.");
        }

        return Promise.reject(error);
    },
);

export default apiClient;
