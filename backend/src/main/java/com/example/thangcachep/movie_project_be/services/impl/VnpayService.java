package com.example.thangcachep.movie_project_be.services.impl;


import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.thangcachep.movie_project_be.config.VnPayConfig;
import com.example.thangcachep.movie_project_be.models.request.VnpayRequest;

import lombok.extern.slf4j.Slf4j;


@Service
@Slf4j
public class VnpayService {

    // TODO: Inject repo/service thực để cộng tiền và kiểm tra trùng giao dịch
    // private final UserService userService;
    // private final TransactionRepository transactionRepository;


    public String createPayment(VnpayRequest paymentRequest) throws UnsupportedEncodingException {
        log.info("📝 Bắt đầu tạo payment VNPay - Số tiền: {} VND", paymentRequest.getAmount());
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";

        long amount = 0;
        try {
            amount = Long.parseLong(paymentRequest.getAmount()) * 100;
            log.debug("💰 Số tiền sau khi convert: {} (x100)", amount);
        } catch (NumberFormatException e) {
            log.error("❌ Số tiền không hợp lệ: {}", paymentRequest.getAmount());
            throw new IllegalArgumentException("Số tiền không hợp lệ");
        }

        // Sử dụng bankCode từ request, mặc định là BIDV nếu không có
        String bankCode = (paymentRequest.getBankCode() != null && !paymentRequest.getBankCode().isEmpty()) 
                ? paymentRequest.getBankCode() 
                : "BIDV";
        
        log.info("🏦 Ngân hàng được chọn: {}", bankCode);
        
        String vnp_TxnRef = VnPayConfig.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = VnPayConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", VnPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        for (String fieldName : fieldNames) {
            String fieldValue = vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName).append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()))
                        .append('=')
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                query.append('&');
                hashData.append('&');
            }
        }

        if (query.length() > 0)
            query.setLength(query.length() - 1);
        if (hashData.length() > 0)
            hashData.setLength(hashData.length() - 1);

        String vnp_SecureHash = VnPayConfig.hmacSHA512(VnPayConfig.vnp_SecretKey, hashData.toString());
        query.append("&vnp_SecureHash=").append(vnp_SecureHash);
        
        String paymentUrl = VnPayConfig.vnp_PayUrl + "?" + query;
        log.info("✅ Tạo VNPay payment URL thành công - Mã giao dịch: {}", vnp_TxnRef);
        log.debug("🔗 Payment URL: {}", paymentUrl);
        
        return paymentUrl;
    }

    public ResponseEntity<?> verifyAndProcess(Map<String, String> params, boolean isIpn) {
        try {
            // 1) Lấy secure hash và tạo bản sao fields để tính lại hash
            String secureHash = params.get("vnp_SecureHash");
            Map<String, String> fields = new HashMap<>(params);
            fields.remove("vnp_SecureHash");
            fields.remove("vnp_SecureHashType");

            // 2) Sort key + build hashData (encoding US_ASCII như lúc tạo đơn)
            List<String> fieldNames = new ArrayList<>(fields.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            for (String name : fieldNames) {
                String value = fields.get(name);
                if (value != null && !value.isEmpty()) {
                    hashData.append(name).append('=')
                            .append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
                    hashData.append('&');
                }
            }
            if (hashData.length() > 0) hashData.setLength(hashData.length() - 1);

            // 3) Tự tính lại hash và so sánh
            String calcHash = VnPayConfig.hmacSHA512(VnPayConfig.vnp_SecretKey, hashData.toString());
            if (!calcHash.equalsIgnoreCase(secureHash)) {
                log.warn("VNPay: chữ ký không hợp lệ");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("INVALID_SIGNATURE");
            }

            // 4) Check trạng thái
            boolean ok = "00".equals(params.get("vnp_ResponseCode"))
                    && "00".equals(params.get("vnp_TransactionStatus"));
            if (!ok) {
                log.warn("VNPay: thanh toán thất bại - code: {}", params.get("vnp_ResponseCode"));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("PAYMENT_FAILED:" + params.get("vnp_ResponseCode"));
            }

            // 5) Parse thông tin giao dịch
            String txnRef = params.get("vnp_TxnRef");
            String txnNo = params.get("vnp_TransactionNo");
            long amountVnd = Long.parseLong(params.getOrDefault("vnp_Amount", "0")) / 100;

            // 6) Idempotent – tránh cộng tiền trùng (pseudo)
            // if (transactionRepository.existsByTxnNo(txnNo)) {
            //     return ResponseEntity.ok("ALREADY_PROCESSED");
            // }

            // 7) Cộng tiền/hoặc kích hoạt VIP cho user tương ứng
            // long userId = ... (lấy từ order ứng với txnRef)
            // userService.addBalance(userId, amountVnd);
            // transactionRepository.save(new Transaction(txnNo, txnRef, amountVnd, SUCCESS, ...));

            log.info("VNPay: xử lý thành công TxnRef={}, TxnNo={}, amount={} VND, ipn={}",
                    txnRef, txnNo, amountVnd, isIpn);

            return ResponseEntity.ok("PAYMENT_OK");
        } catch (Exception e) {
            log.error("VNPay verify error: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("SERVER_ERROR");
        }
    }
}
