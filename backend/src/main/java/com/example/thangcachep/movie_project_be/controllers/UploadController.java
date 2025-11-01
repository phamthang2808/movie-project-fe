package com.example.thangcachep.movie_project_be.controllers; // <-- Sửa lại package cho đúng

import com.example.thangcachep.movie_project_be.services.impl.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/upload")
@CrossOrigin(origins = "*") // Cho phép React gọi
public class UploadController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/video")
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file) {

        // Kiểm tra file rỗng
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File không được rỗng");
        }

        try {
            // 1. Gọi service để upload
            String fileUrl = fileStorageService.uploadFile(file);

            // 2. Trả URL về cho React
            Map<String, String> response = new HashMap<>();
            response.put("videoUrl", fileUrl);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace(); // In lỗi ra console để debug
            return ResponseEntity.status(500).body("Upload thất bại: " + e.getMessage());
        }
    }
}