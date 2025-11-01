package com.example.thangcachep.movie_project_be.controllers;

import com.example.thangcachep.movie_project_be.models.request.ChatRequest;
import com.example.thangcachep.movie_project_be.models.responses.ChatResponse;
import com.example.thangcachep.movie_project_be.services.impl.GeminiChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/chat")
@RequiredArgsConstructor // Tự động @Autowired cho GeminiChatService
@CrossOrigin(origins = "*") // Cho phép React gọi (sau này nên cấu hình cụ thể hơn)
public class ChatController {

    private final GeminiChatService geminiChatService;

    @PostMapping
    public String handleChat(@RequestBody ChatRequest chatRequest) {

        return  geminiChatService.chat(chatRequest);
//        // Gọi service để lấy câu trả lời
//        String responseText = geminiChatService.getGeminiResponse(chatRequest.getPrompt());
//
//        // Trả về cho React
//        return ResponseEntity.ok(new ChatResponse(responseText));
    }
}