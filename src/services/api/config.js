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
    showSpinner: false,
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
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// ==========================================
// REQUEST INTERCEPTOR - Tự động gửi token
// ==========================================
axiosInstance.interceptors.request.use(
    (config) => {
        // Bắt đầu loading bar
        NProgress.start();

        // Lấy token từ localStorage
        const token = localStorage.getItem("token");

        // Nếu có token thì thêm vào header Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Thêm Accept-Language header cho đa ngôn ngữ
        const language = localStorage.getItem("language") || "vi";
        config.headers["Accept-Language"] = language;

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
        // Hoàn thành loading bar
        NProgress.done();
        return response;
    },
    (error) => {
        // Hoàn thành loading bar
        NProgress.done();

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
            ...options,
        };

        if (Object.prototype.hasOwnProperty.call(axiosConfig, "body")) {
            axiosConfig.data = axiosConfig.body;
            delete axiosConfig.body;
        }

        const response = await axiosInstance(axiosConfig);
        return response.data;
    } catch (error) {
        console.error("API Request Error:", error);
        throw error.response ?.data || error;
    }
};