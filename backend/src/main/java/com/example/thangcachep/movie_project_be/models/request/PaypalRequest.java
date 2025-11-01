package com.example.thangcachep.movie_project_be.models.request;

import lombok.Data;

@Data
public class PaypalRequest {
    private String total;
    private String currency = "USD";
}