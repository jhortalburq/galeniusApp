import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {catchError, map} from 'rxjs/operators';
import { EMPTY } from 'rxjs'

import { AuthService } from './auth.service'


@Injectable({
  providedIn: 'root'
})

export class SharedService {
  public empresas: Array<any> = [];
  public sucursales: Array<any> = [];

  public organizacion_seleccionada: any = {id: null};
  public sucursal_seleccionada: any = {id: null};

  constructor(private http: HttpClient, public _authService: AuthService) {
  }

  quitarOrganizacionActivaUsuario() {
    localStorage.removeItem('empresa');
    this.organizacion_seleccionada = {};
  }

  getOrganizacionActivaUsuario() {
    if (this.organizacion_seleccionada && !this.organizacion_seleccionada.id) {
        this.organizacion_seleccionada = JSON.parse(localStorage.getItem('empresa'));
    }
    return this.organizacion_seleccionada;
  }


  getOrganizacionesUsuario(params?: string) {
    if (params) {
      return this.http.get(`${environment.apiUrl}/api/v1/organizaciones`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          this.empresas = res.results;
                          return res;
                      }),
                    catchError(this.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/organizaciones`)
                      .pipe(map( (res: any) => {
                            this.empresas = res.results.filter( (item: any) => item.activo === true)
                            return res;
                        }),
                      catchError(this.handleError)
                    );
    }
  }

  getOrganizacionesUsuarioURL(url, params?: string) {
    if (params) {
      return this.http.get(url, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          this.empresas = res.results;
                          return res;
                      }),
                    catchError(this.handleError)
                  );
    } else {
      return this.http.get(url)
                      .pipe(map( (res: any) => {
                            this.empresas = res.results.filter( (item: any) => item.activo === true)
                            return res;
                        }),
                      catchError(this.handleError)
                    );
    }
  }

  addOrganizacion(empresa: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/organizaciones`, JSON.stringify(empresa));
  }

  editOrganizacion(empresa: any, id: number) {
    return this.http.put(`${environment.apiUrl}/api/v1/organizaciones/${id}`, JSON.stringify(empresa));
  }

  habilitarOrganizacion(id: number) {
    return this.http.post(`${environment.apiUrl}/api/v1/organizaciones/${id}/habilitar`, {});
  }

  deshabilitarOrganizacion(id: number) {
    return this.http.post(`${environment.apiUrl}/api/v1/organizaciones/${id}/deshabilitar`, {});
  }

  modulosOrganizacion(id: number) {
    return this.http.get(`${environment.apiUrl}/api/v1/organizaciones/${id}/modulos`, {});
  }

  modulosSucursal(organizacion: number, sucursal: number) {
    return this.http.get(`${environment.apiUrl}/api/v1/sucursales/${sucursal}/modulos`, {params: { 'organizacion': organizacion }})
  }

  addSucursal(sucursal: any, empresa_id: number) {
    sucursal['organizacion'] = empresa_id;
    let data = JSON.stringify(sucursal);
    return this.http.post(`${environment.apiUrl}/api/v1/sucursales`, data, {});
  }

  editSucursal(sucursal: any, slug: string, empresa_id: any) {
    let data = JSON.stringify(sucursal);
    return this.http.put(`${environment.apiUrl}/api/v1/sucursales/${slug}`, data, {params: {'organizacion': empresa_id}});
  }
  
  getSucursalesOrganizacion(id: any, params?: string) {
    if (params) {
      return this.http.get(`${environment.apiUrl}/api/v1/organizaciones/${id}/sucursales`, {params: { 'search': params }})
                    .pipe(
                      map( (res: any) => {
                          this.sucursales = res.results;
                          return res;
                      }),
                    catchError(this.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/organizaciones/${id}/sucursales` )
                      .pipe(
                        map( (res: any) => {
                            this.sucursales = res.filter( (item: any) => item.activo === true);
                            return res;
                        }),
                      catchError(this.handleError)
                    );
    }
  }

  getSucursalActivo() {
    if (this.sucursal_seleccionada && !this.sucursal_seleccionada.id) {
        this.sucursal_seleccionada = JSON.parse(localStorage.getItem('cm'));
    }
    return this.sucursal_seleccionada;
  }

  quitarSucursalActivo() {
    localStorage.removeItem('cm');
    this.sucursal_seleccionada = {};
  }

  getSucursalesUsuario(organizacion: any, params?: string) {
    if (params) {
      return this.http.get(`${environment.apiUrl}/api/v1/sucursales`, {params: { 'search': params, 'organizacion': organizacion }})
                    .pipe(
                      map( (res: any) => {
                          this.sucursales = res.results;
                          return res;
                      }),
                    catchError(this.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/sucursales`, {params: { 'organizacion': organizacion }})
                      .pipe(
                        map( (res: any) => {
                            this.sucursales = res.results.filter( (item: any) => item.activo === true);
                            return res;
                        }),
                      catchError(this.handleError)
                    );
    }
  }

  getSucursalesUsuarioURL(url, organizacion: any, params?: string) {
    if (params) {
      return this.http.get(url, {params: { 'search': params,  'organizacion': organizacion }})
                    .pipe(
                      map( (res: any) => {
                          this.sucursales = res.results;
                          return res;
                      }),
                    catchError(this.handleError)
                  );
    } else {
      return this.http.get(url, {params: { 'organizacion': organizacion }})
                      .pipe(
                        map( (res: any) => {
                            this.sucursales = res.results.filter( (item: any) => item.activo === true);
                            return res;
                        }),
                      catchError(this.handleError)
                    );
    }
  }

  subirLogotipoSucursal( archivo: File, id: number, organizacion_id: number) {

    return new Promise ( ( resolve, reject ) => {

          let formData = new FormData();
          let xhr = new XMLHttpRequest();

          formData.append('logotipo', archivo, archivo.name );

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

          xhr.open('PUT', `${environment.apiUrl}/api/v1/sucursales/${id}/set_logo?organizacion=${organizacion_id}`, true);
          xhr.setRequestHeader("Authorization", `Bearer ${this._authService.getToken()}`);
          xhr.send( formData );

    })
  }

  getValidarDocumento(codigo: number, no_documento: string) {
    if (codigo === 6 && no_documento.length === 11) {
      return this.http.get(`${environment.sunatUrl}/public/api/ruc/${no_documento}`)
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.handleError)
                  );
    } else if (codigo === 1 && no_documento.length === 8){
      return this.http.get(`${environment.sunatUrl}/public/api/dni/${no_documento}`)
                      .pipe(map( (res: any) => {
                            // this.empresas = res.results.filter( (item: any) => item.activo === true)
                        console.log(res)
                            return res;
                        }),
                      catchError(this.handleError)
                    );
    }  else {
      return null
    }
  }

  getOptionsGenero() {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/generos/`)
                    .pipe(map( (res: any) => {
                              return res['results'];
                          }),
                        catchError(this.handleError)
                      );
  }

  getOptionsUbigeo(params) {
    if (params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/ubigeo`, { params: { 'search': params } })
                    .pipe(map( (res: any) => {
                              return res['results'];
                          }),
                        catchError(this.handleError)
                      );
    } else {
      return EMPTY;
    }
  }

  handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}
