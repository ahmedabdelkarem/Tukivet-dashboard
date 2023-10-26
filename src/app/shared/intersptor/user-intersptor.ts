import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const AuthToken = localStorage.getItem('token_agzz');
    const authRequest = req.clone({
      headers: req.headers
        .set('Authorization', 'Bearer ' + AuthToken)
        .set('web-app', 'true'),
    });
    return next.handle(authRequest);
  }
}
