import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL, HTTP_401_UNAUTHORIZED } from "@/config/constants";

const Api: AxiosInstance = axios.create({baseURL: API_BASE_URL});

// Request interceptor
Api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("authToken");
      
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = "Bearer ${token}";
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
);

// Response interceptor
Api.interceptors.response.use(
    (response: AxiosResponse) => response, 
    (error: AxiosError) => {
        if (error.response?.status === HTTP_401_UNAUTHORIZED) {
            localStorage.removeItem("authToken");
            // Handle unauthorized error (e.g., redirect to login)
        }

        return Promise.reject(error);
    }
);

export default Api;