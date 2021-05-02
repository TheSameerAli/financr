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
    window.sessionStorage.clear();
  }

  /**
   * Saves the token in the session storage under a key TOKEN_KEY
   * @param token string
   */
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Gets the token from session storage.
   * @returns string
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * Saves the user in session storage under a key of USER_KEY
   * @param user User
   */
  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Gets the user object from session storage
   * @returns User
   */
  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
