import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from './../../models/user';
import { Injectable, EventEmitter } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userItemKey = 'user';
  public userLogoutEvent: EventEmitter<any> = new EventEmitter();
  public userLoginEvent: EventEmitter<any> = new EventEmitter();
  constructor(private userService: UserService, private router: Router) { }

  provisionLogin(user: User) {
    localStorage.setItem(this.userItemKey, JSON.stringify(user));
    this.userService.setCurrentUser(user);
    this.userLoginEvent.emit(user);
    return true;
  }

  isLoggedIn(): boolean {
    const data = localStorage.getItem(this.userItemKey);
    if (data === null || data === undefined || data === '') {
      return false;
    }
    const user: User = JSON.parse(data);
    const decodedToken = jwt_decode(user.token);
    if (decodedToken.exp < Math.floor(Date.now() / 1000)) { // Expired token
      return false;
    }
    this.userService.setCurrentUser(user);
    return true;
  }

  logout() {
    localStorage.removeItem(this.userItemKey);
    this.userService.setCurrentUser({email: '', id: '', password: '', token: ''});
    this.userLogoutEvent.emit(true);
    this.router.navigate(['/login']);
  }
}
