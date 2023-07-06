import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {catchError, map} from 'rxjs/operators';

import { SharedService } from './shared.service'

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  addPaciente(paciente: any, empresa_id: any, sucursal_id: any) {
    paciente['organizacion'] = empresa_id;
    paciente['cm'] = sucursal_id;

    try {
      paciente['fecha_nacimiento'] = paciente.fecha_nacimiento.toISOString().split('T')[0];
    } catch {
    }
    return this.http.post(`${environment.apiUrl}/api/v1/pacientes`, JSON.stringify(paciente), {params: { 'organizacion': empresa_id, 'cm': sucursal_id }})
  }

  editPaciente(paciente: any, empresa_id: any, sucursal_id: any, slug: string) {
    paciente['organizacion'] = empresa_id;
    paciente['cm'] = sucursal_id;

    try {
      paciente['fecha_nacimiento'] = paciente.fecha_nacimiento.toISOString().split('T')[0];
    } catch {
      
    }
    return this.http.patch(`${environment.apiUrl}/api/v1/pacientes/${slug}`, JSON.stringify(paciente), {params: { 'organizacion': empresa_id, 'cm': sucursal_id }})
  }

  getPacientes(organizacion: number, cm: number, params?: string) {
    if (params) {
      return this.http.get(`${environment.apiUrl}/api/v1/pacientes`, {params: { 'search': params, 'organizacion': organizacion, 'cm': cm }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/pacientes`, {params: { 'organizacion': organizacion, 'cm': cm }})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getPacientesURL(url: string, organizacion: number, cm: number, params?: string) {
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

  getPaciente(slug: string, organizacion: number, cm: number) {
    return this.http.get(`${environment.apiUrl}/api/v1/pacientes/${slug}`, {params: { 'organizacion': organizacion, 'cm': cm }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }
}
