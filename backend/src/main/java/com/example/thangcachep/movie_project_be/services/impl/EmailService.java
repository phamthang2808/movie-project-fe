package com.example.thangcachep.movie_project_be.services.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * EmailService - Xử lý gửi email
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.base-url}")
    private String baseUrl;

    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Gửi email xác thực
     */
    public void sendVerificationEmail(String toEmail, String token) {
        String verificationUrl = baseUrl + "/verify-email?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Xác thực tài khoản Movie Project");
        message.setText(
                "Chào mừng bạn đến với Movie Project!\n\n" +
                        "Vui lòng click vào link sau để xác thực tài khoản của bạn:\n" +
                        verificationUrl + "\n\n" +
                        "Link có hiệu lực trong 24 giờ.\n\n" +
                        "Trân trọng,\n" +
                        "Đội ngũ Movie Project"
        );

        try {
            mailSender.send(message);
            log.info("✅ Đã gửi email xác thực đến: {}", toEmail);
        } catch (Exception e) {
            log.error("❌ Lỗi khi gửi email đến: {}", toEmail, e);
        }
    }

    /**
     * Gửi email reset password
     */
    public void sendResetPasswordEmail(String toEmail, String token) {
        String resetUrl = baseUrl + "/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Đặt lại mật khẩu Movie Project");
        message.setText(
                "Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.\n\n" +
                        "Click vào link sau để đặt lại mật khẩu:\n" +
                        resetUrl + "\n\n" +
                        "Link có hiệu lực trong 1 giờ.\n\n" +
                        "Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.\n\n" +
                        "Trân trọng,\n" +
                        "Đội ngũ Movie Project"
        );

        try {
            mailSender.send(message);
            log.info("✅ Đã gửi email reset password đến: {}", toEmail);
        } catch (Exception e) {
            log.error("❌ Lỗi khi gửi email reset password đến: {}", toEmail, e);
        }
    }
}

