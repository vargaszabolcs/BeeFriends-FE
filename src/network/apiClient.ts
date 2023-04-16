import axios from "axios";
import Network from "../constants/Network";
import { getLocalData } from "../localStorage/storageHelpers";
import { StorageKeys } from "../localStorage/storageKeys";
import { IUser } from "../types";

const apiClient = axios.create({
    baseURL: Network.API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    async config => {
        let userData = await getLocalData(StorageKeys.USER_DATA, true);

        if (userData) {
            userData = JSON.parse(userData);

            const tokenString = `Bearer ${(userData as unknown as IUser).token}`;

            if (config.headers) config.headers.Authorization = tokenString;
            else config.headers = { Authorization: tokenString };
        }

        return config;
    },
    error => Promise.reject(error),
);

export default apiClient;
