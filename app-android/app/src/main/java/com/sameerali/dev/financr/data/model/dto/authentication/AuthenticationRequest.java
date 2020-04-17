package com.sameerali.dev.financr.data.model.dto.authentication;

public class AuthenticationRequest {
    String email;
    String password;

    public AuthenticationRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
