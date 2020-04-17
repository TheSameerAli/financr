package com.sameerali.dev.financr.data.model.dto.authentication;

public class AuthenticationResponse {
    String id;
    String email;
    String token;

    public AuthenticationResponse() {

    }

    public AuthenticationResponse(String id, String email, String token) {
        this.id = id;
        this.email = email;
        this.token = token;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getToken() {
        return token;
    }
}
