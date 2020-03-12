import { UserService } from './services/user/user.service';
import { User } from './models/user';
import { AuthService } from './services/user/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLoggedIn = false;
  public user: User;
  constructor(private authService: AuthService, private userService: UserService) {
    if (authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.user = userService.getCurrentUser();
    }
    this.authService.userLogoutEvent.subscribe((data) => {
      this.isLoggedIn = false;
    });
    this.authService.userLoginEvent.subscribe(data => {
      this.isLoggedIn = true;
      this.user = userService.getCurrentUser();
    });
  }
  title = 'frontend';
}
