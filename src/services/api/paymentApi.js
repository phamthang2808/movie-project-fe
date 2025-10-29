/**
 * Payment API Service
 * Xử lý payment và recharge operations
 */

import { apiRequest } from "./config";

export const paymentApi = {
    /**
     * Get payment methods
     */
    getPaymentMethods: async () => {
        return apiRequest("/payments/methods", {
            method: "GET",
        });
    },

    /**
     * Create recharge order
     */
    createRechargeOrder: async (orderData) => {
        return apiRequest("/payments/recharge", {
            method: "POST",
            body: JSON.stringify(orderData),
        });
    },

    /**
     * Upgrade to VIP
     */
    upgradeToVIP: async (planData) => {
        return apiRequest("/payments/upgrade-vip", {
            method: "POST",
            body: JSON.stringify(planData),
        });
    },

    /**
     * Get user's balance
     */
    getBalance: async () => {
        return apiRequest("/payments/balance", {
            method: "GET",
        });
    },

    /**
     * Get transaction history
     */
    getTransactionHistory: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return apiRequest(`/payments/transactions?${queryString}`, {
            method: "GET",
        });
    },

    /**
     * Verify payment (callback from payment gateway)
     */
    verifyPayment: async (paymentData) => {
        return apiRequest("/payments/verify", {
            method: "POST",
            body: JSON.stringify(paymentData),
        });
    },

    /**
     * Get VIP plans
     */
    getVIPPlans: async () => {
        return apiRequest("/payments/vip-plans", {
            method: "GET",
        });
    },

    /**
     * Cancel VIP subscription
     */
    cancelVIP: async () => {
        return apiRequest("/payments/cancel-vip", {
            method: "POST",
        });
    },
};

