/**
 * Notification Utility - Hiển thị thông báo thống nhất
 * Sử dụng Ant Design notification
 */

import {
    notification as antdNotification
} from "antd";

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

    // Trường hợp 1: error là object data từ apiRequest (error.response?.data)
    if (error && typeof error === "object" && !error.response && !error.stack) {
        // Đây là object data được throw từ apiRequest
        errorMessage = error.message || error.error || defaultMessage;
        errorDescription = error.details || error.description || "";
    }
    // Trường hợp 2: error là axios error object có .response
    else if (error.response) {
        // Lấy message từ backend
        const {
            data
        } = error.response;
        errorMessage = data ?.message || data ?.error || defaultMessage;
        errorDescription = data ?.details || data ?.description || "";
    }
    // Trường hợp 3: error là Error object thông thường
    else if (error.message) {
        errorMessage = error.message;
    }

    showError(errorMessage, errorDescription);
};

/**
 * Xử lý success từ API response
 * Tự động lấy message từ backend hoặc dùng message mặc định
 */
export const handleApiSuccess = (response, defaultMessage = "Thành công") => {
    const message = response ?.data ?.message || defaultMessage;
    const description = response ?.data ?.details || "";

    showSuccess(message, description);
};