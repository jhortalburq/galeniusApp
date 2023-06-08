import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {catchError, map} from 'rxjs/operators';
import { SharedService } from './shared.service'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public empresas: Array<any>;

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  getUsuarios(params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/usuarios/`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          this.empresas = res.results;
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/usuarios/`)
                      .pipe(map( (res: any) => {
                            this.empresas = res.results.filter( (item: any) => item.is_active === true);
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getUsuariosActivos(empresa_id?: number | null) {
    if (empresa_id) {
      return this.http.get(`${environment.apiUrl}/api/v1/empresas/${empresa_id}/usuarios/`)
                    .pipe(map( (res: any) => {
                          this.empresas = res.results;
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/usuarios/?status=1`)
                      .pipe(map( (res: any) => {
                            this.empresas = res.results.filter( (item: any) => item.is_active === true);
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getUsuariosActivosEmpresa(empresa_id: number, params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/empresas/${empresa_id}/usuarios/`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          this.empresas = res.results;
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/empresas/${empresa_id}/usuarios/`)
                      .pipe(map( (res: any) => {
                            this.empresas = res.results;
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getUsuariosActivosSucursal(sucursal_id: number | null, empresa_id:number | null, params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/empresa/${empresa_id}/sucursales/${sucursal_id}/usuarios/`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          this.empresas = res.results;
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/empresa/${empresa_id}/sucursales/${sucursal_id}/usuarios/`)
                      .pipe(map( (res: any) => {
                            this.empresas = res.results;
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  asignarUsuarioEmpresa(empresa: any, user: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/empresas/${empresa.id}/usuarios/`, JSON.stringify(user), {});
  }

  asignarUsuarioSucursal(sucursal: any, empresa_id:number, user: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/empresa/${empresa_id}/sucursales/${sucursal.id}/usuarios/`, JSON.stringify(user), {});
  }

  addUsuario(usuario: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/usuarios/`, JSON.stringify(usuario), {});
  }

  editsuario(usuario: any, id: number) {
    return this.http.put(`${environment.apiUrl}/api/v1/usuarios/${id}/`, JSON.stringify(usuario), {});
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
}
