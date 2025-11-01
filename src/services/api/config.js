/**
 * API Configuration
 * Sử dụng axios với interceptors tự động gửi token
 */

import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// ==========================================
// NPROGRESS CONFIGURATION
// ==========================================
NProgress.configure({
    showSpinner: true,
    trickleSpeed: 200,
    minimum: 0.3,
});

// ==========================================
// API CONFIGURATION
// ==========================================
export const API_CONFIG = {
    BASE_URL: "http://localhost:8080/api/v1",
    TIMEOUT: 30000,
};

// ==========================================
// AXIOS INSTANCE
// ==========================================
const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    withCredentials: false,
});

// ==========================================
// REQUEST INTERCEPTOR - Tự động gửi token
// ==========================================
axiosInstance.interceptors.request.use(
    (config) => {
        // Bỏ qua NProgress cho các request không phải từ API (như Vite HMR)
        const isApiRequest = config.url && !config.url.includes("vite");
        if (isApiRequest) {
            NProgress.start();
        }

        // Đảm bảo headers object tồn tại
        if (!config.headers) {
            config.headers = {};
        }

        // Lấy token từ localStorage
        const token = localStorage.getItem("token");

        // Nếu có token thì thêm vào header Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Thêm Accept-Language header cho đa ngôn ngữ
        const language = localStorage.getItem("language") || "vi";
        config.headers["Accept-Language"] = language;

        // Nếu có data và chưa có Content-Type, thêm application/json
        if (config.data && !config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => {
        NProgress.done();
        return Promise.reject(error);
    }
);

// ==========================================
// RESPONSE INTERCEPTOR - Xử lý lỗi & Stop loading
// ==========================================
axiosInstance.interceptors.response.use(
    (response) => {
        // Hoàn thành loading bar (chỉ cho API request)
        const isApiRequest = response.config ?.url && !response.config.url.includes("vite");
        if (isApiRequest) {
            NProgress.done();
        }
        return response;
    },
    (error) => {
        // Hoàn thành loading bar (chỉ cho API request)
        const isApiRequest = error.config ?.url && !error.config.url.includes("vite");
        if (isApiRequest) {
            NProgress.done();
        }

        // Xử lý lỗi 401 - Token hết hạn
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

// ==========================================
// EXPORT
// ==========================================
export default axiosInstance;

/**
 * Get auth token from localStorage
 */
export const getAuthToken = () => {
    return localStorage.getItem("token");
};

/**
 * API Request wrapper
 */
export const apiRequest = async (endpoint, options = {}) => {
    try {
        // Normalize fetch-like "body" to axios "data"
        const axiosConfig = {
            url: endpoint,
            method: options.method || "GET",
            ...options,
        };

        if (Object.prototype.hasOwnProperty.call(axiosConfig, "body")) {
            axiosConfig.data = axiosConfig.body;
            delete axiosConfig.body;
        }

        // Đảm bảo Content-Type được set cho POST/PUT/PATCH request có data
        if (axiosConfig.data && ["POST", "PUT", "PATCH"].includes(axiosConfig.method ?.toUpperCase())) {
            if (!axiosConfig.headers) {
                axiosConfig.headers = {};
            }
            if (!axiosConfig.headers["Content-Type"]) {
                axiosConfig.headers["Content-Type"] = "application/json";
            }
        }

        const response = await axiosInstance(axiosConfig);
        return response.data;
    } catch (error) {
        throw error.response ?.data || error;
    }
};