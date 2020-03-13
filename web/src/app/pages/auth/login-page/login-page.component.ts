import { AuthService } from './../../../services/user/auth.service';
import { UserService } from './../../../services/user/user.service';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public isLoading = false;
  public user: User;
  public errorMessage: string;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {
    this.user = {
      email: '',
      id: '',
      password: '',
      token: ''
    };
  }

  ngOnInit() {
  }

  doLogin() {
    this.isLoading = true;
    this.userService.authenticate(this.user.email, this.user.password).subscribe((data: User) => {
      this.authService.provisionLogin(data);
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    }, (err) => {
      this.errorMessage = err.error.message;
      setTimeout(() => { this.errorMessage = undefined; }, 3000);
      this.isLoading = false;
    });
  }

}
