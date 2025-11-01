package com.example.thangcachep.movie_project_be.services.impl;

import com.example.thangcachep.movie_project_be.models.request.PayPalPaymentRequest;
import com.example.thangcachep.movie_project_be.services.IPayPalService;
import com.paypal.core.PayPalHttpClient;
import com.paypal.http.HttpResponse;
import com.paypal.orders.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PayPalService implements IPayPalService {

    private final PayPalHttpClient payPalClient;

    @Override
    public String createPayment(PayPalPaymentRequest request) throws Exception {
        try {
            log.info("📝 Bắt đầu tạo payment PayPal - Số tiền: {} {}", request.getAmount(), request.getCurrency());
            
            // Build order request
            OrderRequest orderRequest = buildOrderRequest(request);
            
            // Create order
            OrdersCreateRequest ordersCreateRequest = new OrdersCreateRequest();
            ordersCreateRequest.prefer("return=representation");
            ordersCreateRequest.requestBody(orderRequest);
            
            // Execute request
            HttpResponse<Order> response = payPalClient.execute(ordersCreateRequest);
            Order order = response.result();
            
            // Get approval link
            String approvalLink = order.links().stream()
                    .filter(link -> "approve".equals(link.rel()))
                    .findFirst()
                    .map(LinkDescription::href)
                    .orElseThrow(() -> new RuntimeException("❌ Không tìm thấy approval link từ PayPal"));
            
            log.info("✅ Tạo PayPal Order thành công - Order ID: {}, Trạng thái: {}", order.id(), order.status());
            log.info("🔗 Approval URL: {}", approvalLink);
            
            return approvalLink;
            
        } catch (Exception e) {
            log.error("❌ Lỗi khi tạo PayPal payment: {}", e.getMessage(), e);
            throw new Exception("Không thể tạo thanh toán PayPal: " + e.getMessage());
        }
    }

    @Override
    public String capturePayment(String orderId) throws Exception {
        try {
            log.info("💳 Bắt đầu capture payment - Order ID: {}", orderId);
            
            OrdersCaptureRequest ordersCaptureRequest = new OrdersCaptureRequest(orderId);
            HttpResponse<Order> response = payPalClient.execute(ordersCaptureRequest);
            Order order = response.result();
            
            log.info("✅ Capture thành công - Order ID: {}, Trạng thái: {}", order.id(), order.status());
            
            if ("COMPLETED".equals(order.status())) {
                String message = String.format("✅ Thanh toán thành công! Mã đơn hàng: %s", order.id());
                log.info(message);
                return message;
            } else {
                String message = String.format("⚠️ Thanh toán chưa hoàn tất. Trạng thái: %s", order.status());
                log.warn(message);
                return message;
            }
            
        } catch (Exception e) {
            log.error("❌ Lỗi khi capture PayPal payment: {}", e.getMessage(), e);
            throw new Exception("Không thể hoàn tất thanh toán: " + e.getMessage());
        }
    }

    private OrderRequest buildOrderRequest(PayPalPaymentRequest request) {
        // Build purchase unit
        PurchaseUnitRequest purchaseUnitRequest = new PurchaseUnitRequest()
                .description(request.getDescription())
                .amountWithBreakdown(new AmountWithBreakdown()
                        .currencyCode(request.getCurrency())
                        .value(String.format("%.2f", request.getAmount())));

        List<PurchaseUnitRequest> purchaseUnits = new ArrayList<>();
        purchaseUnits.add(purchaseUnitRequest);

        // Build application context
        ApplicationContext applicationContext = new ApplicationContext()
                .returnUrl(request.getReturnUrl())
                .cancelUrl(request.getCancelUrl())
                .brandName("Hotel Booking System")
                .landingPage("BILLING")
                .shippingPreference("NO_SHIPPING")
                .userAction("PAY_NOW");

        log.debug("🔧 Đã build OrderRequest - Return URL: {}, Cancel URL: {}", 
                request.getReturnUrl(), request.getCancelUrl());

        // Build order request
        return new OrderRequest()
                .checkoutPaymentIntent("CAPTURE")
                .purchaseUnits(purchaseUnits)
                .applicationContext(applicationContext);
    }
}
