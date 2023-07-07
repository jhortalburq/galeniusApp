import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {catchError, map} from 'rxjs/operators';

import { SharedService } from './shared.service'

@Injectable({
  providedIn: 'root'
})
export class AdmisionService {

  constructor(private http: HttpClient,
    private sharedService: SharedService) {
  }

  addAtencion(registro: any, empresa_id: any, sucursal_id: any, tipo_orden: string) {
    registro['organizacion'] = empresa_id;
    registro['cm'] = sucursal_id;
    try {
      registro['fecha_examen'] = registro.fecha_examen.toISOString().split('T')[0];
    } catch {
    }
    return this.http.post(`${environment.apiUrl}/api/v1/atenciones`, JSON.stringify(registro), {params: { 'organizacion': empresa_id, 'cm': sucursal_id, 'tipo_orden': tipo_orden }})
  }

  editAtencion(registro: any, empresa_id: any, sucursal_id: any, slug: string, tipo_orden: string) {
    registro['registro'] = empresa_id;
    registro['cm'] = sucursal_id;
    try {
      registro['fecha_examen'] = registro.fecha_examen.toISOString().split('T')[0];
    } catch {
    }
    return this.http.patch(`${environment.apiUrl}/api/v1/atenciones/${slug}`, JSON.stringify(registro), {params: { 'organizacion': empresa_id, 'cm': sucursal_id, 'tipo_orden': tipo_orden }})
  }

  getAtenciones(organizacion: number, cm: number, tipo_orden: string, params?: string) {
    if (params) {
      return this.http.get(`${environment.apiUrl}/api/v1/atenciones`, {params: { 'search': params, 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden}})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/atenciones`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden }})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getAtencionesURL(url: string, organizacion: number, cm: number, tipo_orden: string, params?: string) {
    if (params) {
      return this.http.get(url, {params: { 'search': params, 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden  }})
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

  getAtencion(slug: string, organizacion: number, cm: number, tipo_orden: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/atenciones/${slug}`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden  }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  downloadHojaRutaPDF(slug: string, organizacion: number, cm: number, tipo_orden: string ): any {
    return this.http.get(`${environment.apiUrl}/api/v1/atenciones/${slug}/hoja_ruta`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden  }})
  }

  downloadConsentimientoPDF(slug: string, organizacion: number, cm: number, tipo_orden: string ): any {
    return this.http.get(`${environment.apiUrl}/api/v1/atenciones/${slug}/consentimiento_informado`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden  }})
  }
}
