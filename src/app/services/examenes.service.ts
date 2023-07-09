import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {catchError, map} from 'rxjs/operators';

import { SharedService, AuthService } from './services.index'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {

  constructor(private http: HttpClient,
    public _authService: AuthService,
    private sharedService: SharedService) {
  }

  getExamenes(organizacion: number, cm: number, tipo_orden: string, clave: string, params?: string) {
    if (params) {
      return this.http.get(`${environment.apiUrl}/api/v1/examenes/${clave}`, {params: { 'search': params, 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden}})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/examenes/${clave}`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden}})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getExamenesURL(url: string, organizacion: number, cm: number, tipo_orden: string,  params?: string) {
    if (params) {
      return this.http.get(url, {params: { 'search': params, 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden}})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(url, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden }})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getInfoLaboral(slug: string, organizacion: number, cm: number, tipo_orden: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/examenes/emo/${slug}/laboral`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  updateinfoLaboralPaciente(registro: any, empresa_id: number, sucursal_id: number, tipo_orden: string, slug: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/examenes/emo/${slug}/update_laboral`, JSON.stringify(registro), {params: { 'organizacion': empresa_id, 'cm': sucursal_id, 'tipo_orden': tipo_orden}})
  }
}
