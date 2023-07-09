import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {catchError, map} from 'rxjs/operators';

import { SharedService, AuthService } from './services.index'

@Injectable({
  providedIn: 'root'
})
export class AdmisionService {

  constructor(private http: HttpClient,
    private _authService: AuthService,
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

  getResumenAtencion(slug: string, organizacion: number, cm: number, tipo_orden: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/atenciones/${slug}/resumen`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden  }})
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

  getInfoLaboral(slug: string, organizacion: number, cm: number, tipo_orden: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/atenciones/${slug}/laboral`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  updateinfoLaboralPaciente(registro: any, empresa_id: number, sucursal_id: number, tipo_orden: string, slug: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/atenciones/${slug}/update_laboral`, JSON.stringify(registro), {params: { 'organizacion': empresa_id, 'cm': sucursal_id, 'tipo_orden': tipo_orden}})
  }

  getInfoFiliacion(slug: string, organizacion: number, cm: number, tipo_orden: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/atenciones/${slug}/filiacion`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  updateinfoFiliacionPaciente(registro: any, empresa_id: number, sucursal_id: number, tipo_orden: string, slug: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/atenciones/${slug}/update_filiacion`, JSON.stringify(registro), {params: { 'organizacion': empresa_id, 'cm': sucursal_id, 'tipo_orden': tipo_orden}})
  }

  datosBiometricosOrden( organizacion_id: number, cm: number, slug: string, registro: any, tipo_orden: string) {

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

          xhr.open('PUT', `${environment.apiUrl}/api/v1/atenciones/${slug}/datos_biometricos?organizacion=${organizacion_id}&cm=${cm}&tipo_orden=${tipo_orden}`, true);
          xhr.setRequestHeader("Authorization", `Bearer ${this._authService.getToken()}`);
          xhr.send( formData );

    })
  }
}
