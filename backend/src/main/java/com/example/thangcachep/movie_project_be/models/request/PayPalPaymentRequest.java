package com.example.thangcachep.movie_project_be.models.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PayPalPaymentRequest {
    private Double amount;
    private String currency; // USD, VND, etc.
    private String description;
    private String returnUrl;
    private String cancelUrl;
}

