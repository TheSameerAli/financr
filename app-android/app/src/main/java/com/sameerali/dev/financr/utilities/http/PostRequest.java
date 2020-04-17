package com.sameerali.dev.financr.utilities.http;
import android.os.AsyncTask;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class PostRequest<TReturn> extends AsyncTask<String, Void, TReturn> {

    String endpoint;
    String jsonBody;
    Type typeOfReturn;
    HttpURLConnection con;

    public PostRequest(String endpoint, String jsonBody, Type typeOfReturn) throws IOException {
        this.endpoint = endpoint;
        this.jsonBody = jsonBody;
        this.typeOfReturn = typeOfReturn;
        URL url = null;
        try {
            url = new URL(endpoint);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        this.con = (HttpURLConnection)url.openConnection();
    }

    @Override
    protected TReturn doInBackground(String... data) {
        Gson gson = new Gson();

        try {
            setConnectionProperties();
            try(OutputStream os = con.getOutputStream()) {
                byte[] input = jsonBody.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }
            int code = con.getResponseCode();

            try(BufferedReader br = new BufferedReader(
                    new InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                JSONObject jsonObj = new JSONObject(response.toString());
                return gson.fromJson(jsonObj.toString(), typeOfReturn);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public PostRequest setBearerToken(String token) {
        con.setRequestProperty("Authorization", "Bearer " + token);
        return this;
    }

    private void setConnectionProperties() throws ProtocolException {
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json; utf-8");
        con.setRequestProperty("Accept", "application/json");
        con.setDoOutput(true);
    }
}