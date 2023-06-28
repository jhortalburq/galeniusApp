import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { SharedService } from './shared.service'
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {

  constructor(private http: HttpClient,
    private sharedService: SharedService) {
  }

  addEspecialista(especialista: any, empresa_id: any, sucursal_id: any) {
    especialista['sucursal'] = [sucursal_id];
    especialista['organizacion'] = empresa_id;
    try {
      especialista['fecha_nacimiento'] = especialista.fecha_nacimiento.toISOString().split('T')[0];
    } catch {
    }
    return this.http.post(`${environment.apiUrl}/api/v1/especialistas`, JSON.stringify(especialista));
  }

  editEspecialista(especialista: any, empresa_id: any, sucursal_id: any, slug: string) {
    especialista['sucursal'] = [sucursal_id];
    especialista['organizacion'] = empresa_id;

    try {
      especialista['fecha_nacimiento'] = especialista.fecha_nacimiento.toISOString().split('T')[0];
    } catch {
    }
    return this.http.patch(`${environment.apiUrl}/api/v1/especialistas/${slug}`, JSON.stringify(especialista));
  }

  getEspecialistas(params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/especialistas`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/especialistas`)
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getEspecialista(slug: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/especialistas/${slug}`)
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }
}
