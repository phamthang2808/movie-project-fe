import { useState } from "react";
import { handleApiError, handleApiSuccess } from "../utils/notification";

/**
 * Custom Hook để xử lý API calls với loading state và error handling
 * 
 * @param {Function} apiFunction - Function API cần gọi
 * @param {Object} options - Các options: successMessage, errorMessage, onSuccess, onError
 * @returns {Object} - { data, loading, error, execute, reset }
 */
export const useApiCall = (apiFunction, options = {}) => {
    const {
        successMessage,
        errorMessage = "Có lỗi xảy ra",
        onSuccess,
        onError,
        showSuccessNotification = true,
        showErrorNotification = true,
    } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Execute API call
     */
    const execute = async (...args) => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiFunction(...args);
            setData(response.data);

            // Show success notification
            if (showSuccessNotification) {
                handleApiSuccess(response, successMessage);
            }

            // Callback on success
            if (onSuccess) {
                onSuccess(response.data);
            }

            return response.data;
        } catch (err) {
            setError(err);

            // Show error notification
            if (showErrorNotification) {
                handleApiError(err, errorMessage);
            }

            // Callback on error
            if (onError) {
                onError(err);
            }

            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Reset state
     */
    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    };

    return {
        data,
        loading,
        error,
        execute,
        reset,
    };
};

/**
 * Hook đơn giản hơn - chỉ trả về loading state
 */
export const useLoading = (initialState = false) => {
    const [loading, setLoading] = useState(initialState);

    const withLoading = async (apiFunction, ...args) => {
        try {
            setLoading(true);
            const result = await apiFunction(...args);
            return result;
        } finally {
            setLoading(false);
        }
    };

    return [loading, withLoading, setLoading];
};

