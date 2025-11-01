package com.example.thangcachep.movie_project_be.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.thangcachep.movie_project_be.models.request.VnpayRequest;
import com.example.thangcachep.movie_project_be.services.impl.VnpayService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@RestController
@RequestMapping("${api.prefix}/vnpay")
@RequiredArgsConstructor
@Slf4j
public class VnpayController {

    private final VnpayService vnpayService;

    /**
     * Tạo payment URL cho VNPay
     * POST /api/v1/vnpay/create
     */
    @PostMapping("/create")
    public ResponseEntity<String> createPayment(@RequestBody VnpayRequest paymentRequest) {
        try {
            log.info("📨 Nhận request tạo VNPay payment - Số tiền: {} VND", paymentRequest.getAmount());
            
            String paymentUrl = vnpayService.createPayment(paymentRequest);
            
            log.info("✅ Trả về payment URL cho client");
            return ResponseEntity.ok(paymentUrl);
            
        } catch (IllegalArgumentException e) {
            log.error("❌ Lỗi validate: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            log.error("❌ Lỗi tạo VNPay payment: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Đã xảy ra lỗi khi tạo thanh toán!");
        }
    }

    /**
     * Callback URL từ VNPay sau khi thanh toán
     * GET /api/v1/vnpay/return?vnp_ResponseCode=00
     */
    @GetMapping("/return")
    public ResponseEntity<?> vnpReturn(@RequestParam Map<String, String> params) {
        return vnpayService.verifyAndProcess(params, false);
    }

    // IPN URL (server-to-server, dùng để chốt giao dịch, độ tin cậy cao)
    @GetMapping("/ipn")
    public ResponseEntity<String> vnpIpn(@RequestParam Map<String, String> params) {
        // Theo spec VNPay, IPN nên trả về chuỗi (OK/ERROR...) – tuỳ yêu cầu bạn có thể thay đổi
        return vnpayService.verifyAndProcess(params, true).getStatusCode().is2xxSuccessful()
                ? ResponseEntity.ok("OK")
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR");
    }
}