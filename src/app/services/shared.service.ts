import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {catchError, map} from 'rxjs/operators';
import { EMPTY } from 'rxjs'



@Injectable({
  providedIn: 'root'
})

export class SharedService {

  constructor(private http: HttpClient) {
  }

  getOptionsGenero() {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/generos/`)
                    .pipe(map( (res: any) => {
                              return res['results'];
                          }),
                        catchError(this.handleError)
                      );
  }

  getOptionsCargoVendedor(empresa: number | null) {
      return this.http.get(`${environment.apiUrl}/api/v1/empresa/${empresa}/cargo-vendedores/`)
                    .pipe(map( (res: any) => {
                      console.log(res);
                              return res['results'];
                          }),
                        catchError(this.handleError)
                      );
  }

  getOptionsUbigeo(params) {
    if (params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/ubigeo/`, { params: { 'search': params } })
                    .pipe(map( (res: any) => {
                              return res['results'];
                          }),
                        catchError(this.handleError)
                      );
    } else {
      return EMPTY;
    }
  }


  getOptionsUM(params){
    if (params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/um/`, { params: { 'search': params } })
                    .pipe(map( (res: any) => {
                              return res['results'];
                          }),
                        catchError(this.handleError)
                      );
    } else {
      return EMPTY;
    }
  }

  handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}
