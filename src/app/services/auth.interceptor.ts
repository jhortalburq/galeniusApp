import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor( public _authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authService.getToken()}`,
        'Content-Type': `application/json; charset=utf-8`,
      }
    });

    return next.handle(request);
  }
}
