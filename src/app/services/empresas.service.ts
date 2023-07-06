import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { SharedService } from './shared.service'
import {catchError, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private http: HttpClient,
    private sharedService: SharedService) {
  }


  getEmpresas(organizacion: number, cm: number, params?: string) {
    if (params) {
      return this.http.get(`${environment.apiUrl}/api/v1/empresas`, {params: { 'search': params, 'cm': cm, 'organizacion': organizacion }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/empresas`, {params: { 'cm': cm , 'organizacion': organizacion }})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getEmpresasURL(url: string, organizacion: number, cm: number, params?: string) {
    if (params && params.length > 2) {
      return this.http.get(url, {params: { 'search': params, 'cm': cm, 'organizacion': organizacion }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(url, {params: { 'cm': cm , 'organizacion': organizacion }})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  addEmpresa(registro: any, organizacion: number, sucursal_id: any) {
    registro['organizacion'] = organizacion;
    registro['cm'] = sucursal_id;
    return this.http.post(`${environment.apiUrl}/api/v1/empresas`, JSON.stringify(registro), {params: { 'cm': sucursal_id , 'organizacion': organizacion }})
  }

  editEmpresa(registro: any, organizacion: number, sucursal_id: any, slug: string) {
    registro['organizacion'] = organizacion;
    registro['cm'] = sucursal_id;
    return this.http.patch(`${environment.apiUrl}/api/v1/empresas/${slug}`, JSON.stringify(registro), {params: { 'cm': sucursal_id , 'organizacion': organizacion }})
  }

  getEmpresa(organizacion: number, cm: number, slug: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/empresas/${slug}`,  {params: { 'cm': cm , 'organizacion': organizacion }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }
}
