/**
 * Upload API Service
 * Xử lý file upload operations
 */

import {
    API_CONFIG,
    getAuthToken
} from "./config";

export const uploadApi = {
    /**
     * Upload single file
     * @param {File} file - File to upload
     * @param {string} fieldName - Form field name (default: "file")
     */
    uploadFile: async (file, fieldName = "file") => {
        const formData = new FormData();
        formData.append(fieldName, file);

        const token = getAuthToken();
        const response = await fetch(`${API_CONFIG.BASE_URL}/upload/single`, {
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
        return data.url || data.data ? .url || data.fileUrl;
    },

    /**
     * Upload multiple files
     * @param {FileList|File[]} files - Files to upload
     */
    uploadMultipleFiles: async (files) => {
        const formData = new FormData();

        Array.from(files).forEach((file) => {
            formData.append("files", file);
        });

        const token = getAuthToken();
        const response = await fetch(`${API_CONFIG.BASE_URL}/upload/multiple`, {
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
        return data.urls || data.data ? .urls || [];
    },

    /**
     * Delete file
     * @param {string} fileUrl - URL of file to delete
     */
    deleteFile: async (fileUrl) => {
        const token = getAuthToken();
        const response = await fetch(`${API_CONFIG.BASE_URL}/upload/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                fileUrl
            }),
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: "Delete failed",
            }));
            throw new Error(error.message || "Delete failed");
        }

        return response.json();
    },
};