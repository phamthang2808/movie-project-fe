package com.example.thangcachep.movie_project_be.config; // <-- Nhớ đổi lại package cho đúng

import com.paypal.core.PayPalEnvironment;
import com.paypal.core.PayPalHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PayPalConfig {

    // Lấy giá trị từ file application.yml
    @Value("${paypal.client.id}")
    private String clientId;

    @Value("${paypal.client.secret}")
    private String clientSecret;

    @Value("${paypal.mode}")
    private String mode;

    /**
     * Đây chính là hàm tạo ra Bean "PayPalHttpClient" mà Spring đang tìm kiếm.
     */
    @Bean
    public PayPalHttpClient payPalHttpClient() {
        PayPalEnvironment environment;

        // Kiểm tra xem đang chạy ở chế độ sandbox hay live
        if ("sandbox".equals(mode)) {
            environment = new PayPalEnvironment.Sandbox(clientId, clientSecret);
        } else {
            environment = new PayPalEnvironment.Live(clientId, clientSecret);
        }

        // Tạo và trả về đối tượng HttpClient
        PayPalHttpClient client = new PayPalHttpClient(environment);

        // Bạn cũng có thể set user agent ở đây nếu muốn
        // client.setUserAgent("My-App-Name/1.0");

        return client;
    }
}