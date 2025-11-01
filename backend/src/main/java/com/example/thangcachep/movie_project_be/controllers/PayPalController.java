package com.example.thangcachep.movie_project_be.controllers;

import com.example.thangcachep.movie_project_be.models.request.PayPalPaymentRequest;
import com.example.thangcachep.movie_project_be.services.impl.PayPalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("${api.prefix}/paypal")
@RequiredArgsConstructor
@Slf4j
public class PayPalController {

    private final PayPalService payPalService;

    /**
     * Tạo payment và nhận approval URL
     * POST /api/v1/paypal/create
     */
    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestBody PayPalPaymentRequest request) {
        try {
            log.info("📨 Nhận request tạo PayPal payment - Số tiền: {} {}", 
                    request.getAmount(), request.getCurrency());
            
            // Validate request
            if (request.getAmount() == null || request.getAmount() <= 0) {
                log.warn("⚠️ Số tiền không hợp lệ: {}", request.getAmount());
                return ResponseEntity.badRequest()
                        .body(createErrorResponse("Số tiền không hợp lệ"));
            }
            
            if (request.getCurrency() == null || request.getCurrency().isEmpty()) {
                request.setCurrency("USD"); // Default currency
                log.info("💱 Sử dụng tiền tệ mặc định: USD");
            }
            
            // Create payment
            String approvalUrl = payPalService.createPayment(request);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("approvalUrl", approvalUrl);
            response.put("message", "✅ Tạo thanh toán thành công. Vui lòng chuyển đến PayPal để hoàn tất.");
            
            log.info("✅ Trả về approval URL cho client");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Lỗi tạo PayPal payment: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Không thể tạo thanh toán: " + e.getMessage()));
        }
    }

    /**
     * Callback sau khi user approve payment trên PayPal
     * GET /api/v1/paypal/success?token=ORDER_ID
     */
    @GetMapping("/success")
    public ResponseEntity<?> successPayment(@RequestParam("token") String orderId) {
        try {
            log.info("🎉 User đã approve payment - Order ID: {}", orderId);
            
            String result = payPalService.capturePayment(orderId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("orderId", orderId);
            response.put("message", result);
            
            log.info("✅ Capture payment thành công");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Lỗi capture payment: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Không thể hoàn tất thanh toán: " + e.getMessage()));
        }
    }

    /**
     * Callback khi user cancel payment
     * GET /api/v1/paypal/cancel
     */
    @GetMapping("/cancel")
    public ResponseEntity<?> cancelPayment() {
        log.warn("❌ User đã hủy thanh toán PayPal");
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "Thanh toán đã bị hủy bởi người dùng");
        
        return ResponseEntity.ok(response);
    }

    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("message", message);
        return error;
    }
}
