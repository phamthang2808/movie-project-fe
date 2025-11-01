package com.example.thangcachep.movie_project_be.services.impl;


import com.example.thangcachep.movie_project_be.gemini.Content;
import com.example.thangcachep.movie_project_be.gemini.GeminiRequest;
import com.example.thangcachep.movie_project_be.gemini.GeminiResponse;
import com.example.thangcachep.movie_project_be.gemini.Part;
import com.example.thangcachep.movie_project_be.models.request.ChatRequest;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class GeminiChatService {

    private final ChatClient chatClient;

    public GeminiChatService(ChatClient.Builder builder){
        chatClient = builder.build();
    }

    public String chat(ChatRequest chatRequest){
        return chatClient
                .prompt(chatRequest.message())
                .call()
                .content();
    }

//    @Value("${gemini.api-key}")
//    private String apiKey;
//
//    @Value("${gemini.api-url}")
//    private String apiUrl;
//
//    // Dùng RestTemplate để gọi API
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    public String getGeminiResponse(String prompt) {
//        // 1. URL và Headers
//        String url = apiUrl + "?key=" + apiKey;
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // 2. Xây dựng Request Body (JSON) theo cấu trúc của Google
//        Part part = new Part(prompt);
//        Content content = new Content(Collections.singletonList(part));
//        GeminiRequest requestBody = new GeminiRequest(Collections.singletonList(content));
//
//        HttpEntity<GeminiRequest> entity = new HttpEntity<>(requestBody, headers);
//
//        try {
//            // 3. Gọi API
//            ResponseEntity<GeminiResponse> response = restTemplate.postForEntity(url, entity, GeminiResponse.class);
//
//            // 4. Xử lý kết quả (phân tích JSON)
//            if (response.getBody() != null && response.getBody().getCandidates() != null && !response.getBody().getCandidates().isEmpty()) {
//
//                // Lấy text từ part đầu tiên của candidate đầu tiên
//                return response.getBody().getCandidates().get(0).getContent().getParts().get(0).getText();
//            }
//
//            return "Xin lỗi, tôi không thể nhận được phản hồi.";
//
//        } catch (Exception e) {
//            // Log lỗi (ví dụ: e.printStackTrace())
//            return "Đã xảy ra lỗi khi gọi Gemini API: " + e.getMessage();
//        }
//    }
}