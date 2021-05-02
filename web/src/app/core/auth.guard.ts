import { TokenStorageService } from './../_services/token-storage.service';
import { AuthService } from './../_services/auth.service';
import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) {}

  /**
   * Can this route be activated?
   * @param {ActivatedRouteSnapshot} route - The route.
   * @returns {Promise<boolean>} True if user is authenticated otherwise false
   */
  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.checkUserLoggedIn();
  }

  /**
   * Can this child route be activated?
   * @param {ActivatedRouteSnapshot} route - The route.
   * @returns {Promise<boolean>} True if user is authenticated otherwise false
   */
  public async canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
    return this.checkUserLoggedIn();
  }

  /**
   * Can this route be loaded.
   * @returns {boolean} True if user is authenticated otherwise false
   */
  public canLoad(): boolean {
    return this.checkUserLoggedIn();
  }

  private checkUserLoggedIn() {
    if (!!this.tokenStorageService.getToken()) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
    return false;
  }

}
