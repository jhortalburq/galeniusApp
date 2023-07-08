import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {catchError, map} from 'rxjs/operators';

import { SharedService, AuthService } from './services.index'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient,
              public _authService: AuthService,
              private sharedService: SharedService) {
  }

  addPaciente(empresa_id: any, sucursal_id: any, paciente: any): Observable<any>{
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

  getPacientesForm(organizacion: number, cm: number, params?: string): Observable<any>{
    if (params) {
        return this.http.get(`${environment.apiUrl}/api/v1/pacientes`, {params: { 'search': params, 'organizacion': organizacion, 'cm': cm, 'type': 'true' }})
    } else {
        return this.http.get(`${environment.apiUrl}/api/v1/pacientes`, {params: { 'organizacion': organizacion, 'cm': cm, 'type': 'true' }})
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
  
  getPacienteLaboral(organizacion: number, cm: number, slug: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/pacientes/${slug}/laboral`, {params: { 'organizacion': organizacion, 'cm': cm }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  infoLaboralPaciente(empresa_id: any, sucursal_id: any, registro: any): Observable<any>{
    registro['organizacion'] = empresa_id;
    registro['cm'] = sucursal_id;
    return this.http.post(`${environment.apiUrl}/api/v1/paciente/info-laboral`, JSON.stringify(registro), {params: { 'organizacion': empresa_id, 'cm': sucursal_id }})
  }

  updateinfoLaboralPaciente(registro: any, empresa_id: any, sucursal_id: any) {
    return this.http.patch(`${environment.apiUrl}/api/v1/paciente/info-laboral/${registro.info}`, JSON.stringify(registro), {params: { 'organizacion': empresa_id, 'cm': sucursal_id }})
  }

  datosBiometricosPaciente( organizacion_id: number, cm: number, slug: string, registro: any) {
    console.log(registro);

    return new Promise ( ( resolve, reject ) => {

          let formData = new FormData();
          let xhr = new XMLHttpRequest();

          if (registro.imagen) {
            formData.append('imagen', registro.imagen, registro.imagen.name );
          }

          if (registro.firma) {
            formData.append('firma', registro.firma, registro.firma.name );
          }

          if (registro.huella) {
            formData.append('huella', registro.huella, registro.huella.name );
          }

          formData.append("changeImage", registro.changeImage);
          formData.append("changeFirma", registro.changeFirma);
          formData.append("changeHuella", registro.changeHuella);

          xhr.onreadystatechange = () => {
              if ( xhr.readyState === 4 ){
                  if ( xhr.status === 201 ) {
                      console.log('Imagen Subida');
                      resolve( JSON.parse(xhr.response) );
                  }else{
                      console.log('Fallo en la subida');
                      reject( JSON.parse(xhr.response) );
                  }
              }
          }

          xhr.open('PUT', `${environment.apiUrl}/api/v1/pacientes/${slug}/datos_biometricos?organizacion=${organizacion_id}&cm=${cm}`, true);
          xhr.setRequestHeader("Authorization", `Bearer ${this._authService.getToken()}`);
          xhr.send( formData );

    })
  }
}
