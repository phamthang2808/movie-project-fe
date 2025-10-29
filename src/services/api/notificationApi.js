/**
 * Notification API Service
 * Xử lý notification operations
 */

import { apiRequest } from "./config";

export const notificationApi = {
    /**
     * Get all notifications
     */
    getAllNotifications: async () => {
        return apiRequest("/notifications", {
            method: "GET",
        });
    },

    /**
     * Get unread notifications
     */
    getUnreadNotifications: async () => {
        return apiRequest("/notifications/unread", {
            method: "GET",
        });
    },

    /**
     * Mark notification as read
     */
    markAsRead: async (notificationId) => {
        return apiRequest(`/notifications/${notificationId}/read`, {
            method: "PUT",
        });
    },

    /**
     * Mark all notifications as read
     */
    markAllAsRead: async () => {
        return apiRequest("/notifications/mark-all-read", {
            method: "PUT",
        });
    },

    /**
     * Delete notification
     */
    deleteNotification: async (notificationId) => {
        return apiRequest(`/notifications/${notificationId}`, {
            method: "DELETE",
        });
    },

    /**
     * Delete all notifications
     */
    deleteAllNotifications: async () => {
        return apiRequest("/notifications", {
            method: "DELETE",
        });
    },

    /**
     * Get notification settings
     */
    getNotificationSettings: async () => {
        return apiRequest("/notifications/settings", {
            method: "GET",
        });
    },

    /**
     * Update notification settings
     */
    updateNotificationSettings: async (settings) => {
        return apiRequest("/notifications/settings", {
            method: "PUT",
            body: JSON.stringify(settings),
        });
    },
};

