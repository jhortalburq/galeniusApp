
import {catchError, map} from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { User } from '../models/user';

import { environment } from '../../environments/environment';


@Injectable()
export class AuthService {
  token: string;

  public usuario: any = {empresa: '', nombre: ''};

  userIsloggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  private code: string;
  private cachedURL: string | null;

  httpOptions = {
    headers: new HttpHeaders(
            {
              'Content-Type': 'application/json'
            }
          )
      };

  constructor(private router: Router,
              private location: Location,
              private http: HttpClient) {}


  getToken(): string | null{
    return localStorage.getItem('token');
  }

  login(user: User){
    return this.http.post(`${environment.apiUrl}/api/v1/token`, JSON.stringify(user)).pipe(
                        map((res: any) => {
                          console.log(res)
                                  localStorage.setItem('token', res.token);
                                  localStorage.setItem('username', user.username);
                                  return res;
                          }),
                          catchError(this.handleError),
      );
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(
       error);
  }

  logout(): Promise<boolean> {
    return new Promise(resolve => {
      console.log('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      });
  }

  verifyLogin(url: any): boolean{
    if (!this.isLoggedIn() && this.code == null){
      this.router.navigate(['/login']);
      return false;
    }
    else if (this.isLoggedIn()){
      return true;
    }
    else if (!this.isLoggedIn() && this.code != null){
       const params = new URLSearchParams(this.location.path(false).split('?')[1]);
       if (params.get('code') && (localStorage.getItem('cachedurl') === '' || localStorage.getItem('cachedurl') === undefined)){
          localStorage.setItem('cachedurl', this.location.path(false).split('?')[0]);
       }
       if (this.cachedURL != null || this.cachedURL !== ''){
          this.cachedURL = localStorage.getItem('cachedurl');
       }
    }
    return false
  }

  public isLoggedIn(): boolean{
    let status = false;

    if ( this.getToken() != null ){
      status = true;
    }
    else{
      status = false;
    }
    return status;
  }
}
