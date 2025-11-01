package com.example.thangcachep.movie_project_be.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final FileUploadProperties fileUploadProperties;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Thư mục uploads từ configuration
        Path uploadDir = Paths.get(fileUploadProperties.getUploadDir());
        String absolute = uploadDir.toFile().getAbsolutePath();

        String uploadPath = "/" + fileUploadProperties.getUploadDir() + "/**";
        
        registry.addResourceHandler(uploadPath)
                .addResourceLocations("file:" + absolute + "/");

        // Nếu FE có gọi kiểu http://host:8088/api/uploads/...
        registry.addResourceHandler("/api" + uploadPath)
                .addResourceLocations("file:" + absolute + "/");
    }
}

