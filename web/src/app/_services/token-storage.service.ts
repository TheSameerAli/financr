import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  /**
   * Clears the session storage causing the application to sign out.
   */
  signOut(): void {
    window.localStorage.clear();
  }

  /**
   * Saves the token in the session storage under a key TOKEN_KEY
   * @param token string
   */
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Gets the token from session storage.
   * @returns string
   */
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Saves the user in session storage under a key of USER_KEY
   * @param user User
   */
  public saveUser(user): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Gets the user object from session storage
   * @returns User
   */
  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
}
