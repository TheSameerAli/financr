import { UserPreferences } from './../_models/user-preferences';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const USER_ENDPOINT = `${environment.api}/user`
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  constructor(private http: HttpClient) { }

  getPreferences(): Observable<UserPreferences> {
    return this.http.get<UserPreferences>(`${USER_ENDPOINT}/preferences`);

  }

  changeCurrency(currency: string): Observable<UserPreferences> {
    return this.http.patch<UserPreferences>(`${USER_ENDPOINT}/change-currency`, {currency: currency}, httpOptions);
  }
}
