/**
 * User API Service
 * Xử lý user CRUD operations
 */

import {
    apiRequest
} from "./config";

export const userApi = {
    /**
     * Get current user profile
     */
    getProfile: async () => {
        return apiRequest("/users/profile", {
            method: "GET",
        });
    },

    /**
     * Update user profile
     */
    updateProfile: async (userData) => {
        return apiRequest("/users/profile", {
            method: "PUT",
            body: JSON.stringify(userData),
        });
    },

    /**
     * Change password
     */
    changePassword: async (oldPassword, newPassword) => {
        return apiRequest("/users/change-password", {
            method: "POST",
            body: JSON.stringify({
                oldPassword,
                newPassword
            }),
        });
    },

    /**
     * Upload avatar
     * @param {File} file - Avatar file
     */
    uploadAvatar: async (file) => {
        const formData = new FormData();
        formData.append("avatar", file);

        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/v1/users/upload-avatar", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: "Upload failed",
            }));
            throw new Error(error.message || "Upload failed");
        }

        const data = await response.json();
        return data.avatarUrl || data.data?.avatarUrl || data.url;
    },

    /**
     * Delete avatar
     */
    deleteAvatar: async () => {
        return apiRequest("/users/avatar", {
            method: "DELETE",
        });
    },

    /**
     * Get user by ID
     */
    getUserById: async (userId) => {
        return apiRequest(`/users/${userId}`, {
            method: "GET",
        });
    },

    /**
     * Get all users (admin only)
     */
    getAllUsers: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/users?${queryString}`, {
            method: "GET",
        });
    },
};