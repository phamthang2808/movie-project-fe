/**
 * Auth API Service
 * Xử lý authentication (đăng nhập, đăng ký, đăng xuất)
 */

import { apiRequest } from "./config";

export const authApi = {
    /**
     * Login
     */
    login: async (credentials) => {
        return apiRequest("/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        });
    },

    /**
     * Register
     */
    register: async (userData) => {
        return apiRequest("/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    },

    /**
     * Logout
     */
    logout: async () => {
        return apiRequest("/auth/logout", {
            method: "POST",
        });
    },

    /**
     * Refresh token
     */
    refreshToken: async (refreshToken) => {
        return apiRequest("/auth/refresh-token", {
            method: "POST",
            body: JSON.stringify({ refreshToken }),
        });
    },

    /**
     * Verify email
     */
    verifyEmail: async (token) => {
        return apiRequest("/auth/verify-email", {
            method: "POST",
            body: JSON.stringify({ token }),
        });
    },

    /**
     * Forgot password
     */
    forgotPassword: async (email) => {
        return apiRequest("/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify({ email }),
        });
    },

    /**
     * Reset password
     */
    resetPassword: async (token, newPassword) => {
        return apiRequest("/auth/reset-password", {
            method: "POST",
            body: JSON.stringify({ token, newPassword }),
        });
    },
};

