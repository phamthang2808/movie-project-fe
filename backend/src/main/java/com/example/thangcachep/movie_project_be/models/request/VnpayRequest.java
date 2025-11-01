package com.example.thangcachep.movie_project_be.models.request;

import lombok.Data;

@Data
public class VnpayRequest {
    private String amount;
    private String bankCode; // NCB, BIDV, VCB, TCB, etc.
}