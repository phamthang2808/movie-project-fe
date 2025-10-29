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
// CÁC BIẾN CẤU HÌNH
// ==========================================

// Backend URL - Lấy từ file .env
export const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

// ==========================================
// AXIOS INSTANCE CHO BACKEND
// ==========================================

const instance = axios.create({
    baseURL: `${BACKEND_URL}/api/v1`, // Thêm /api/v1 vào baseURL
    withCredentials: true, // Gửi cookies
});

// Request Interceptor - Tự động thêm token vào header & Start NProgress
instance.interceptors.request.use(
    (config) => {
        // Bắt đầu loading bar
        NProgress.start();
        
        // Lấy token từ localStorage
        const token = localStorage.getItem("token");

        // Nếu có token thì thêm vào header Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        NProgress.done();
        return Promise.reject(error);
    }
);

// Response Interceptor - Xử lý lỗi chung & Stop NProgress
instance.interceptors.response.use(
    (response) => {
        // Hoàn thành loading bar
        NProgress.done();
        return response;
    },
    (error) => {
        // Hoàn thành loading bar
        NProgress.done();
        
        // Xử lý lỗi 401 - Token hết hạn hoặc không hợp lệ
        if (error.response && error.response.status === 401) {
            // Xóa token và chuyển về trang login
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default instance;