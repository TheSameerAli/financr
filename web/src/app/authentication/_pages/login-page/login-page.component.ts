import { LoginFormViewModel } from './../../_models/login-form-view-model';
import { TokenStorageService } from './../../_services/token-storage.service';
import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public isLoading = false;
  public loginForm: LoginFormViewModel = {
    email: '',
    password: ''
  }
  public isFailed = false;
  public errorMessage = '';
  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.isLoading = true;
    this.isFailed = false;
    this.authService.login(this.loginForm.email, this.loginForm.password).subscribe(data => {
      this.isLoading = false;
      this.tokenStorageService.saveToken(data.token);
      this.authService.authEvent.emit();
      this.router.navigate(['']);
    }, (err) => {
      console.log(err.error.message);
      this.isLoading = false;
      this.isFailed = true;
      this.errorMessage = err.error.message;
    })
  }

}
