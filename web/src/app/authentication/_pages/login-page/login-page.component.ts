import { LoginFormViewModel } from './../../_models/login-form-view-model';
import { TokenStorageService } from './../../_services/token-storage.service';
import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public isLoading = false;
  public loginForm: FormGroup;
  public isFailed = false;
  public errorMessage = '';
  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (!this.loginForm.invalid) {
      this.isLoading = true;
      this.isFailed = false;
      
      this.authService.login(this.username.value, this.password.value).subscribe(data => {
        this.isLoading = false;
        this.tokenStorageService.saveToken(data.token);
        this.authService.authEvent.emit();
        this.router.navigate(['']);
      }, (err) => {
        this.isLoading = false;
        this.isFailed = true;
        this.errorMessage = err.error.message;
      })
    }

  }

}
