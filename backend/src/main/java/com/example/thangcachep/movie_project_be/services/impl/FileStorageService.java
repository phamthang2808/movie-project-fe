package com.example.thangcachep.movie_project_be.services.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.thangcachep.movie_project_be.config.FileUploadProperties;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    @Autowired
    private S3Client s3Client; // Bean S3Client từ R2Config

    @Value("${r2.bucket-name}")
    private String bucketName;

    @Value("${r2.public-url}")
    private String publicUrl;

    /**
     * Upload file lên R2 và trả về URL công khai
     */
    public String uploadFile(MultipartFile file) throws IOException {

        // 1. Tạo một tên file duy nhất (để tránh trùng lặp)
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

        // 2. Chuẩn bị yêu cầu Upload
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(uniqueFileName) // Tên file trên R2
                .contentType(file.getContentType()) // Báo cho R2 biết đây là file gì (video/mp4)
                .build();

        // 3. Gửi file (dưới dạng InputStream) lên R2
        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(
                file.getInputStream(), file.getSize()
        ));

        // 4. Trả về URL công khai (Public URL)
        // Ví dụ: https://pub-....r2.dev/a1b2c3d4-my_video.mp4
        return publicUrl + "/" + uniqueFileName;
    }

//    private final FileUploadProperties fileUploadProperties;
//
//    /**
//     * Lưu file vào thư mục upload và trả về tên file duy nhất
//     */
//    public String storeFile(MultipartFile file) throws IOException {
//        if (file == null || file.isEmpty()) {
//            throw new IllegalArgumentException("File cannot be null or empty");
//        }
//
//        String filename = StringUtils.cleanPath(file.getOriginalFilename());
//        // Thêm UUID vào trước tên file để đảm bảo tên file là duy nhất
//        String uniqueFilename = UUID.randomUUID().toString() + "_" + filename.toLowerCase();
//
//        // Đường dẫn đến thư mục lưu file từ configuration
//        Path uploadDir = Paths.get(fileUploadProperties.getUploadDir());
//
//        // Kiểm tra và tạo thư mục nếu nó không tồn tại
//        if (!Files.exists(uploadDir)) {
//            Files.createDirectories(uploadDir);
//        }
//
//        // Đường dẫn đầy đủ đến file
//        Path destination = Paths.get(uploadDir.toString(), uniqueFilename);
//
//        // Sao chép file vào thư mục đích
//        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
//
//        return uniqueFilename;
//    }
//
//    /**
//     * Trả về đường dẫn đầy đủ cho URL của file
//     */
//    public String getFileUrl(String filename) {
//        return "/" + fileUploadProperties.getUploadDir() + "/" + filename;
//    }
//
//    /**
//     * Xóa file khỏi hệ thống
//     */
//    public boolean deleteFile(String filename) {
//        try {
//            Path filePath = Paths.get(fileUploadProperties.getUploadDir()).resolve(filename);
//            return Files.deleteIfExists(filePath);
//        } catch (IOException e) {
//            return false;
//        }
//    }
}

