import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5000/user'
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  logout():void {
    this.tokenStorageService.signOut();
  }

  login(email, password): Observable<any> {
    return this.http.post(`${AUTH_API}/authenticate`, {email: email, password: password}, httpOptions);
  }
}
