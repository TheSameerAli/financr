package com.sameerali.dev.financr.repositories;

import android.content.SharedPreferences;

import androidx.appcompat.app.AppCompatActivity;

import com.auth0.android.jwt.JWT;
import com.sameerali.dev.financr.data.model.User;
import com.sameerali.dev.financr.data.model.dto.authentication.AuthenticationRequest;
import com.sameerali.dev.financr.data.model.dto.authentication.AuthenticationResponse;
import com.sameerali.dev.financr.services.AuthenticationService;

import java.util.Date;

public class AuthRepository extends AppCompatActivity {

    public User login(String email, String password) {
        AuthenticationService authService = new AuthenticationService();
        AuthenticationResponse authResponse = authService.authenticate(email, password);
        if (authResponse == null) {
            return null;
        }
        return new User(authResponse.getEmail(), authResponse.getToken());
    }

    public boolean isLoggedIn(SharedPreferences userData) {
        String email = userData.getString("email", "no-email");
        String token = userData.getString("token", "no-token");
        if (email.equals("no-email") && token.equals("no-token")) {
            return false;
        }
        JWT jwt = new JWT(token);
        Date expiresAt = jwt.getExpiresAt();
        return expiresAt == null || !expiresAt.before(new Date());
    }

    public String getAccessToken(SharedPreferences userData) {
        return userData.getString("token", "no-token");
    }
}
