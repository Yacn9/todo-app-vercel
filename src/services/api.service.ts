import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "config";

axios.defaults.baseURL = BASE_URL;
axios.interceptors.response.use(
    (config: AxiosResponse) => Promise.resolve(config.data),
    (error: AxiosError) => Promise.reject(error)
);

const unAuth = axios.create();

export { unAuth as default };