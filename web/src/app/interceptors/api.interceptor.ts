import { UserService } from './../services/user/user.service';
import { environment } from './../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({ url: environment.apiUri + req.url });
    if (req.url.split('/')[req.url.split('/').length - 1] === 'authenticate') {
      return next.handle(req);
    }
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userService.getCurrentUser().token}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(req);
  }
}
