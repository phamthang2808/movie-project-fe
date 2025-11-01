package com.example.thangcachep.movie_project_be.gemini;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Candidate {
    private Content content; // Tái sử dụng class Content ở trên
}