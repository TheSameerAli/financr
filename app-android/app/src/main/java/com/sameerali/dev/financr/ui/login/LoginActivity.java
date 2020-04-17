package com.sameerali.dev.financr.ui.login;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.annotation.StringRes;
import androidx.appcompat.app.AppCompatActivity;

import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.sameerali.dev.financr.DashboardActivity;
import com.sameerali.dev.financr.R;
import com.sameerali.dev.financr.data.model.User;
import com.sameerali.dev.financr.repositories.AuthRepository;

public class LoginActivity extends AppCompatActivity {

    private LoginViewModel loginViewModel;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        final EditText emailEditText = findViewById(R.id.email_input);
        final EditText passwordEditText = findViewById(R.id.password_input);
        Button loginButton = findViewById(R.id.signin_button);

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AuthRepository authRepository = new AuthRepository();
                User user = authRepository.login(emailEditText.getText().toString(),
                        passwordEditText.getText().toString());
                if (user != null) {
                    Toast.makeText(getApplicationContext(), "Successful login", Toast.LENGTH_LONG).show();
                    storeCreds(user.getEmail(), user.getAuthToken());
                    redirectToDashboard();
                }
                if (user == null) {
                    showLoginFailed(R.string.login_failed);
                }
            }
        });
    }

    private void redirectToDashboard() {
        Intent intent = new Intent(this, DashboardActivity.class);
        startActivity(intent);
    }

    private void storeCreds(String email, String token) {
        SharedPreferences.Editor editor =
                getSharedPreferences(com.sameerali.dev.financr.configuration.SharedPreferences.UserCreds, MODE_PRIVATE)
                        .edit();
        editor.putString("email", email);
        editor.putString("token", token);
        editor.apply();
    }

    private void updateUiWithUser(LoggedInUserView model) {
        String welcome = getString(R.string.welcome) + model.getDisplayName();
        // TODO : initiate successful logged in experience
        Toast.makeText(getApplicationContext(), welcome, Toast.LENGTH_LONG).show();
    }

    private void showLoginFailed(@StringRes Integer errorString) {
        Toast.makeText(getApplicationContext(), errorString, Toast.LENGTH_SHORT).show();
    }
}
