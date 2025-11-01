package com.example.thangcachep.movie_project_be.services;

import com.example.thangcachep.movie_project_be.models.request.PayPalPaymentRequest;

public interface IPayPalService {
    /** * Tạo payment order với PayPal * @param request thông tin thanh toán * @return approval URL để redirect user đến PayPal */
    String createPayment(PayPalPaymentRequest request) throws Exception;

    /** * Capture payment sau khi user approve * @param orderId PayPal order ID * @return thông tin capture result */
    String capturePayment(String orderId) throws Exception;
}

