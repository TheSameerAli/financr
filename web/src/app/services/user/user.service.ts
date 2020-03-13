import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;
  constructor(private http: HttpClient) { }

  public authenticate(email: string, password: string) {
    const data = {
      email,
      password
    };
    const uri = `/user/authenticate`;
    return this.http.post(uri, data);
  }

  public setCurrentUser(user: User) {
    this.user = user;
  }

  public getCurrentUser() {
    if (this.user === undefined || this.user === null) {
      throw Error('User is not set');
    }
    return this.user;
  }
}
