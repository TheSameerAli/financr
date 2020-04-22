package com.sameerali.dev.financr.data.model;

public class User {
    String email;
    String authToken;

    public User(String email, String authToken) {
        this.email = email;
        this.authToken = authToken;
    }

    public String getEmail() {
        return this.email;
    }

    public String getAuthToken() {
        return this.authToken;
    }
}
