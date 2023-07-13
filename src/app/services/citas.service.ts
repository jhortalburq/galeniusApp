import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { SharedService } from './shared.service'
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http: HttpClient,
    private sharedService: SharedService) {
  }

  getCitasEspecialista(especialista_id: number, especialidad_id: number, empresa: number, cm: number, fecha: string, fecha_fin: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/citas`, {params: { 'especialista': especialista_id, 'especialidad': especialidad_id, 'organizacion': empresa, 'cm': cm, 'fecha': fecha, 'fecha_fin': fecha_fin}})
                      .pipe(
                        map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
  }

  addCitaPaciente(registro: any, organizacion: number, cm: number) {
    registro['cm'] = cm;
    console.log(registro)
    return this.http.post(`${environment.apiUrl}/api/v1/citas`, JSON.stringify(registro), {params: {'organizacion': organizacion, 'cm': cm}});
  }

}
