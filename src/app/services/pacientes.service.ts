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
    paciente['cm'] = sucursal_id;
    paciente['organizacion'] = empresa_id;
    try {
      paciente['fecha_nacimiento'] = paciente.fecha_nacimiento.toISOString().split('T')[0];
    } catch {
    }
    return this.http.post(`${environment.apiUrl}/api/v1/pacientes`, JSON.stringify(paciente));
  }

  editPaciente(paciente: any, empresa_id: any, sucursal_id: any, slug: string) {
    paciente['cm'] = sucursal_id;
    paciente['organizacion'] = empresa_id;
    try {
      paciente['fecha_nacimiento'] = paciente.fecha_nacimiento.toISOString().split('T')[0];
    } catch {
      
    }
    return this.http.patch(`${environment.apiUrl}/api/v1/pacientes/${slug}`, JSON.stringify(paciente));
  }

  getPacientes(params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/pacientes`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/pacientes`)
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getPaciente(slug: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/pacientes/${slug}`)
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }
}
