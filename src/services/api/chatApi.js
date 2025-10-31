/**
 * Chat API Service
 * Xử lý chat với Gemini AI
 */

import {
    apiRequest
} from "./config";

export const chatApi = {
    /**
     * Gửi tin nhắn chat
     * @param {string} message - Nội dung tin nhắn
     */
    sendMessage: async (message) => {
        const response = await apiRequest("/chat", {
            method: "POST",
            withCredentials: false,
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                message
            },
        });

        return typeof response === "string" ? response : String(response || "");
    },
};