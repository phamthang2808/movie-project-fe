/**
 * Upload Service
 * Xử lý upload files lên server
 */

const API_BASE_URL = "http://localhost:5000/api";

/**
 * Upload avatar
 * @param {File} file - File ảnh cần upload
 * @returns {Promise<string>} - URL của ảnh đã upload
 */
export const uploadAvatar = async (file) => {
    try {
        const formData = new FormData();
        formData.append("avatar", file);

        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/users/upload-avatar`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Upload failed");
        }

        const data = await response.json();
        return data.avatarUrl || data.data?.avatarUrl || data.url;
    } catch (error) {
        console.error("Upload avatar error:", error);
        throw error;
    }
};

/**
 * Upload multiple files
 * @param {FileList} files - Danh sách file cần upload
 * @returns {Promise<string[]>} - Mảng URLs của các ảnh đã upload
 */
export const uploadMultipleFiles = async (files) => {
    try {
        const formData = new FormData();

        Array.from(files).forEach((file) => {
            formData.append("files", file);
        });

        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Upload failed");
        }

        const data = await response.json();
        return data.urls || data.data?.urls || [];
    } catch (error) {
        console.error("Upload multiple files error:", error);
        throw error;
    }
};

/**
 * Delete avatar
 * @param {string} avatarUrl - URL của ảnh cần xóa
 * @returns {Promise<boolean>}
 */
export const deleteAvatar = async (avatarUrl) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/users/delete-avatar`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                avatarUrl
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Delete failed");
        }

        return true;
    } catch (error) {
        console.error("Delete avatar error:", error);
        throw error;
    }
};