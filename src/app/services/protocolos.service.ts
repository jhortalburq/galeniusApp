import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {catchError, map, } from 'rxjs/operators';

import { SharedService } from './shared.service'

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProtocolosService {

  constructor(private http: HttpClient,
    private sharedService: SharedService) {
  }

  addProtocolo(registro: any, empresa_id: any, sucursal_id: any) {
    registro['organizacion'] = empresa_id;
    registro['cm'] = sucursal_id;
    return this.http.post(`${environment.apiUrl}/api/v1/protocolos`, JSON.stringify(registro), {params: { 'organizacion': empresa_id, 'cm': sucursal_id }})
  }

  editProtocolo(registro: any, empresa_id: any, sucursal_id: any, slug: string) {
    registro['registro'] = empresa_id;
    registro['cm'] = sucursal_id;
    return this.http.patch(`${environment.apiUrl}/api/v1/protocolos/${slug}`, JSON.stringify(registro), {params: { 'organizacion': empresa_id, 'cm': sucursal_id }})
  }

  getProtocolos(organizacion: number, cm: number, params?: string) {
    if (params) {
      return this.http.get(`${environment.apiUrl}/api/v1/protocolos`, {params: { 'search': params, 'organizacion': organizacion, 'cm': cm }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/protocolos`, {params: { 'organizacion': organizacion, 'cm': cm }})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getProtocolosForm(organizacion: number, cm: number, params?: string): Observable<any>{
    if (params) {
        return this.http.get(`${environment.apiUrl}/api/v1/protocolos`, {params: { 'search': params, 'organizacion': organizacion, 'cm': cm, 'type': 'true' }})
    } else {
        return this.http.get(`${environment.apiUrl}/api/v1/protocolos`, {params: { 'organizacion': organizacion, 'cm': cm, 'type': 'true' }})
    }
  }

  getProtocolosItemsForm(organizacion: number, cm: number, id: any): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/v1/protocolo/items/${id}`, {params: {'organizacion': organizacion, 'cm': cm}})
  }

  getProtocolosURL(url: string, organizacion: number, cm: number, params?: string) {
    if (params) {
      return this.http.get(url, {params: { 'search': params, 'organizacion': organizacion, 'cm': cm }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(url, {params: { 'organizacion': organizacion, 'cm': cm }})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getProtocolo(slug: string, organizacion: number, cm: number) {
    return this.http.get(`${environment.apiUrl}/api/v1/protocolos/${slug}`, {params: { 'organizacion': organizacion, 'cm': cm }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }
}
