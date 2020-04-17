package com.sameerali.dev.financr.services;
import android.os.AsyncTask;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sameerali.dev.financr.data.model.dto.authentication.AuthenticationRequest;
import com.sameerali.dev.financr.data.model.dto.authentication.AuthenticationResponse;
import com.sameerali.dev.financr.utilities.http.PostRequest;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class AuthenticationService {
    public AuthenticationResponse authenticate(String email, String password) {
        AuthenticationRequest authenticationRequest = new AuthenticationRequest(email, password);
        String endpoint = "https://api.financr.sameerali.dev/user/authenticate";
        Gson gson = new Gson();
        String json = gson.toJson(new AuthenticationRequest(email, password));

        PostRequest<AuthenticationResponse> request =
                null;
        try {
            request = new PostRequest(endpoint, json, new TypeToken<AuthenticationResponse>(){}.getType())
            .setBearerToken("token");
        } catch (IOException e) {
            e.printStackTrace();
        }
        AuthenticationResponse authResponse = null;
        try {
            authResponse = request.execute().get();
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }
        return authResponse;
    }
}