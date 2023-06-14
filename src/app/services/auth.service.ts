
import {catchError, map} from 'rxjs/operators';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { User } from '../models/user';

import { environment } from '../../environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class AuthService {
  token: string;

  public usuario: any = {empresa: '', nombre: ''};

  //public
  public currentUser: Observable<any>;

  //private
  private currentUserSubject: BehaviorSubject<any>;
  
  httpOptions = {
    headers: new HttpHeaders(
            {
              'Content-Type': 'application/json'
            }
          )
      };

  constructor(private router: Router,
              private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}' ));
        this.currentUser = this.currentUserSubject.asObservable();                
  }


  getToken(): string | null{
    return this.currentUserValue.access;
  }

  login(user: User){
    return this.http.post(`${environment.apiUrl}/api/v1/token`, JSON.stringify(user)).pipe(
                        map((res: any) => {
                            if (res && res.access) {
                              localStorage.setItem('currentUser', JSON.stringify(res));
                              this.currentUserSubject.next(res);
                            }
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

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  get is_expirate() {
    let now = new Date().getTime();
    let expiration = new Date(this.currentUserSubject.value?.expiration).getTime();
    if ( (expiration - now) > 0 ) {
      return false
    } else {
      return true
    }
  }

  // /**
  //  *  Confirms if user is admin
  //  */
  // get isAdmin() {
  //   return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  // }

  // /**
  //  *  Confirms if user is client
  //  */
  // get isClient() {
  //   return this.currentUser && this.currentUserSubject.value.role === Role.Client;
  // }

}
