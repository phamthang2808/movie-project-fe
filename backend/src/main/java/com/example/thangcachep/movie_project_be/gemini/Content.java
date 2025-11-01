package com.example.thangcachep.movie_project_be.gemini;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;
@Data
@AllArgsConstructor
public class Content {
    private List<Part> parts;
}