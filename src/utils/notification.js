/**
 * Notification Utility - Hiển thị thông báo thống nhất
 * Sử dụng Ant Design notification
 */

import { notification as antdNotification } from "antd";

// Cấu hình mặc định
antdNotification.config({
    placement: "topRight",
    duration: 3,
    maxCount: 3,
});

/**
 * Hiển thị notification thành công
 */
export const showSuccess = (message, description) => {
    antdNotification.success({
        message: message || "Thành công",
        description,
    });
};

/**
 * Hiển thị notification lỗi
 */
export const showError = (message, description) => {
    antdNotification.error({
        message: message || "Có lỗi xảy ra",
        description,
    });
};

/**
 * Hiển thị notification warning
 */
export const showWarning = (message, description) => {
    antdNotification.warning({
        message: message || "Cảnh báo",
        description,
    });
};

/**
 * Hiển thị notification info
 */
export const showInfo = (message, description) => {
    antdNotification.info({
        message,
        description,
    });
};

/**
 * Xử lý error từ API response
 * Tự động lấy message từ backend hoặc dùng message mặc định
 */
export const handleApiError = (error, defaultMessage = "Có lỗi xảy ra") => {
    let errorMessage = defaultMessage;
    let errorDescription = "";

    if (error.response) {
        // Lấy message từ backend
        const { data } = error.response;
        errorMessage = data?.message || data?.error || defaultMessage;
        errorDescription = data?.details || "";
    } else if (error.message) {
        errorDescription = error.message;
    }

    showError(errorMessage, errorDescription);
};

/**
 * Xử lý success từ API response
 * Tự động lấy message từ backend hoặc dùng message mặc định
 */
export const handleApiSuccess = (response, defaultMessage = "Thành công") => {
    const message = response?.data?.message || defaultMessage;
    const description = response?.data?.details || "";
    
    showSuccess(message, description);
};









