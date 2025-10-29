/**
 * Category API Service
 * Xử lý category/genre operations
 */

import { apiRequest } from "./config";

export const categoryApi = {
    /**
     * Get all categories
     */
    getAllCategories: async () => {
        return apiRequest("/categories", {
            method: "GET",
        });
    },

    /**
     * Get category by ID
     */
    getCategoryById: async (categoryId) => {
        return apiRequest(`/categories/${categoryId}`, {
            method: "GET",
        });
    },

    /**
     * Create category (admin only)
     */
    createCategory: async (categoryData) => {
        return apiRequest("/categories", {
            method: "POST",
            body: JSON.stringify(categoryData),
        });
    },

    /**
     * Update category (admin only)
     */
    updateCategory: async (categoryId, categoryData) => {
        return apiRequest(`/categories/${categoryId}`, {
            method: "PUT",
            body: JSON.stringify(categoryData),
        });
    },

    /**
     * Delete category (admin only)
     */
    deleteCategory: async (categoryId) => {
        return apiRequest(`/categories/${categoryId}`, {
            method: "DELETE",
        });
    },
};

