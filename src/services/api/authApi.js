/**
 * Auth API Service
 * Xử lý authentication (đăng nhập, đăng ký, đăng xuất)
 */

import {
    apiRequest
} from "./config";

export const authApi = {
    /**
     * Login
     */
    login: async (credentials) => {
        return apiRequest("/auth/login", {
            method: "POST",
            body: credentials,
        });
    },

    /**
     * Register
     */
    register: async (userData) => {
        return apiRequest("/auth/register", {
            method: "POST",
            body: userData,
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
            body: {
                refreshToken
            },
        });
    },

    /**
     * Verify email
     */
    verifyEmail: async (token) => {
        return apiRequest(`/auth/verify-email?token=${encodeURIComponent(token)}`, {
            method: "POST",
        });
    },

    /**
     * Forgot password
     */
    forgotPassword: async (email) => {
        return apiRequest("/auth/forgot-password", {
            method: "POST",
            body: {
                email
            },
        });
    },

    /**
     * Reset password
     */
    resetPassword: async (token, newPassword) => {
        return apiRequest("/auth/reset-password", {
            method: "POST",
            body: {
                token,
                newPassword
            },
        });
    },

    /**
     * Google OAuth login/register
     */
    googleLogin: async (code) => {
        return apiRequest("/auth/google", {
            method: "POST",
            body: {
                code
            },
        });
    },
};