import { TokenStorageService } from './token-storage.service';
import { EventEmitter, Injectable } from '@angular/core';
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
  public authEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  logout():void {
    this.tokenStorageService.signOut();
    this.authEvent.emit();
  }

  login(email, password): Observable<any> {
    return this.http.post(`${AUTH_API}/authenticate`, {email: email, password: password}, httpOptions);
  }
}
