package com.example.thangcachep.movie_project_be.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class GoogleUserInfo {
    private String id;
    private String email;
    
    @JsonProperty("verified_email")
    private Boolean verifiedEmail;
    
    private String name;
    private String picture; // Avatar URL
    
    @JsonProperty("given_name")
    private String givenName;
    
    @JsonProperty("family_name")
    private String familyName;
}

