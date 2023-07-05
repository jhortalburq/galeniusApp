import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { SharedService } from './shared.service'
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  constructor(private http: HttpClient,
    private sharedService: SharedService) {
  }

  getHorariosEspecialista(especialista_id: number, especialidad_id: number, empresa: number, cm: number, fecha: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/horarios/horarios-especialistas`, {params: { 'especialista': especialista_id, 'especialidad': especialidad_id, 'empresa': empresa, 'cm': cm, 'fecha': fecha}})
                      .pipe(
                        map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
  }

  setHorarioEspecialista(registro: any, organizacion: number, cm: number) {
    registro['cm'] = cm;
    registro['fecha'] = registro.fecha.split('T')[0];
    console.log(registro)
    return this.http.post(`${environment.apiUrl}/api/v1/horarios/agenda-especialistas`, JSON.stringify(registro), {params: {'organizacion': organizacion, 'cm': cm}});
  }

}
