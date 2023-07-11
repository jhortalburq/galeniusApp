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
  
  getAntecedentesLaborales(organizacion: number, cm: number, tipo_orden: string, ficha_slug: string, params?: string) {
      return this.http.get(`${environment.apiUrl}/api/v1/antecedentes/laborales`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden, 'ficha_slug': ficha_slug}})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
  }

  updateAtencedenteLaboralFicha(registro: any, organizacion: number, sucursal_id: any, tipo_orden: string, ficha_slug: string) {
    return this.http.post(`${environment.apiUrl}/api/v1/antecedentes/laborales`, JSON.stringify(registro), {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
  }

  deleteAtencedenteLaboralFicha(item_id, organizacion: number, sucursal_id: any, tipo_orden: string, ficha_slug: string) {
    return this.http.delete(`${environment.apiUrl}/api/v1/antecedentes/laborales/${item_id}`, {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
  }

  getAntecedenteAbsentismos(organizacion: number, cm: number, tipo_orden: string, ficha_slug: string, params?: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/antecedentes/absentismos`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden, 'ficha_slug': ficha_slug}})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  updateAbsentismoLaboralFicha(registro: any, organizacion: number, sucursal_id: any, tipo_orden: string, ficha_slug: string) {
    return this.http.post(`${environment.apiUrl}/api/v1/antecedentes/absentismos`, JSON.stringify(registro), {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
  }

  deleteAbsentismoLaboralFicha(item_id, organizacion: number, sucursal_id: any, tipo_orden: string, ficha_slug: string) {
    return this.http.delete(`${environment.apiUrl}/api/v1/antecedentes/absentismos/${item_id}`, {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
  }

  getAntecedentesFamiliares(organizacion: number, cm: number, tipo_orden: string, ficha_slug: string, params?: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/antecedentes/familiares`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden, 'ficha_slug': ficha_slug}})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  updateAntecedenteFamiliarFicha(registro: any, organizacion: number, sucursal_id: any, tipo_orden: string, ficha_slug: string) {
    return this.http.post(`${environment.apiUrl}/api/v1/antecedentes/familiares`, JSON.stringify(registro), {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
  }

  getHabitosNocivos(organizacion: number, cm: number, tipo_orden: string, ficha_slug: string, params?: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/antecedentes/habitos`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden, 'ficha_slug': ficha_slug}})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  updateHabitosNocivos(registro: any, organizacion: number, sucursal_id: any, tipo_orden: string, ficha_slug: string) {
    return this.http.post(`${environment.apiUrl}/api/v1/antecedentes/habitos`, JSON.stringify(registro), {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
  }

  getAntecedentesPersonales(organizacion: number, cm: number, tipo_orden: string, ficha_slug: string, params?: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/antecedentes/personales`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden, 'ficha_slug': ficha_slug}})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  updateAntecedentePersonalesFicha(registro: any, organizacion: number, sucursal_id: any, tipo_orden: string, ficha_slug: string) {
    return this.http.post(`${environment.apiUrl}/api/v1/antecedentes/personales`, JSON.stringify(registro), {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
  }

  getDetalleFicha(organizacion: number, cm: number, clave: string, tipo_orden: string, ficha_slug: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/examenes/${clave}/${ficha_slug}`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden}})
                  .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  getDetalleCuestionario(organizacion: number, cm: number, clave: string, tipo_orden: string, ficha_slug: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/${clave}/cuestionario/${ficha_slug}`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden}})
                  .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  updateEvaluacionFicha(organizacion: number, sucursal_id: any, tipo_orden: string, clave: string, ficha_slug: string, registro: any) {
    return this.http.patch(`${environment.apiUrl}/api/v1/examenes/${clave}/${ficha_slug}`, JSON.stringify(registro), {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
  }

  updateCuestionarioFicha(organizacion: number, sucursal_id: any, tipo_orden: string, clave: string, ficha_slug: string, registro: any) {
    return this.http.patch(`${environment.apiUrl}/api/v1/${clave}/cuestionario/${ficha_slug}`, JSON.stringify(registro), {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
  }

  getDiagnosticosFicha(organizacion: number, cm: number, clave: string, tipo_orden: string, ficha_slug: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/${clave}/diagnosticos`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden, 'ficha_slug': ficha_slug}})
                  .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  getOtrosDiagnosticosFicha(organizacion: number, cm: number, clave: string, tipo_orden: string, ficha_slug: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/${clave}/otros-diagnosticos`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden, 'ficha_slug': ficha_slug}})
                  .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  getArchivosFicha(organizacion: number, cm: number, clave: string, tipo_orden: string, ficha_slug: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/${clave}/archivos`, {params: { 'organizacion': organizacion, 'cm': cm, 'tipo_orden': tipo_orden, 'ficha_slug': ficha_slug}})
                  .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  updateDiagnosticoFicha(organizacion: number, sucursal_id: any, tipo_orden: string, clave: string, ficha_slug: string, registro: any, tipo?: number) {
    if (Number(tipo) === 2) {
      return this.http.post(`${environment.apiUrl}/api/v1/${clave}/otros-diagnosticos`, JSON.stringify(registro), {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
    } else {
      return this.http.post(`${environment.apiUrl}/api/v1/${clave}/diagnosticos`, JSON.stringify(registro), {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
    }
  }

  updateArchivoFicha(organizacion_id: number, cm: number, tipo_orden: string, clave: string, ficha_slug: string, archivo: File) {

    return new Promise ( ( resolve, reject ) => {

          let formData = new FormData();
          let xhr = new XMLHttpRequest();

          formData.append('file', archivo, archivo.name );
          formData.append('nombre', archivo.name );

          xhr.onreadystatechange = () => {
              if ( xhr.readyState === 4 ){
                  if ( xhr.status === 201 ) {
                      console.log('Archivo Subida');
                      resolve( JSON.parse(xhr.response) );
                  }else{
                      console.log('Fallo en la subida');
                      reject( JSON.parse(xhr.response) );
                  }
              }
          }

          xhr.open('POST', `${environment.apiUrl}/api/v1/${clave}/archivos?organizacion=${organizacion_id}&cm=${cm}&tipo_orden=${tipo_orden}&ficha_slug=${ficha_slug}`, true);
          xhr.setRequestHeader("Authorization", `Bearer ${this._authService.getToken()}`);
          xhr.send( formData );

    })
  }

  deleteDiagnosticoFicha(item_id:number, organizacion: number, sucursal_id: any, tipo_orden: string, clave: string, ficha_slug: string, tipo?: number) {
    if (Number(tipo) === 2) {
      return this.http.delete(`${environment.apiUrl}/api/v1/${clave}/otros-diagnosticos/${item_id}`, {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
    } else {
      return this.http.delete(`${environment.apiUrl}/api/v1/${clave}/diagnosticos/${item_id}`, {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
    }
  }

  deleteArchivoFicha(item_id:number, organizacion: number, sucursal_id: any, tipo_orden: string, clave: string, ficha_slug: string) {
    return this.http.delete(`${environment.apiUrl}/api/v1/${clave}/archivos/${item_id}`, {params: { 'cm': sucursal_id , 'organizacion': organizacion, 'ficha_slug': ficha_slug, 'tipo_orden': tipo_orden}})
  }

}


