import { UserService } from './services/user/user.service';
import { User } from './models/user';
import { AuthService } from './services/user/auth.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public user: User;
  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.user = this.userService.getCurrentUser();
      console.log(this.isLoggedIn);
    }

    this.authService.userLogoutEvent.subscribe((data) => {
      this.isLoggedIn = false;
      this.user = {
        id: '',
        email: '',
        password: '',
        token: '',
      };
      console.log(this.isLoggedIn);
    });

    this.authService.userLoginEvent.subscribe(data => {
      this.isLoggedIn = true;
      this.user = this.userService.getCurrentUser();
      console.log(this.isLoggedIn);
    });
  }
}
