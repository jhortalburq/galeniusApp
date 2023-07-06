import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {catchError, map, filter} from 'rxjs/operators';
import { SharedService } from './shared.service'

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  public sucursales: Array<any> = [];
  public sucursal_seleccionada = {
    nombre_sucursal: null,
    id: null
  };

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
}

  getSucursalesUsuario(id: any, params?: string) {
    if (params) {
      return this.http.get(`${environment.apiUrl}/api/v1/empresa/${id}/sucursales/`, {params: { 'search': params }})
                    .pipe(
                      map( (res: any) => {
                          this.sucursales = res.results;
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/empresa/${id}/sucursales/` )
                      .pipe(
                        map( (res: any) => {
                            this.sucursales = res.results.filter( (item: any) => item.activo === true);
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getSucursalActivaUsuario(empresa_id) {
    return this.http.get(`${environment.apiUrl}/api/v1/empresa/${empresa_id}/sucursales/seleccionado/`);
  }

  setSucursalActivaUsuario(sucursal: any, empresa_id) {
    return this.http.post(`${environment.apiUrl}/api/v1/empresa/${empresa_id}/sucursales/${sucursal.id}/seleccionar/`, {}, {});
  }

  addSucursal(sucursal: any, empresa_id: number) {
    return this.http.post(`${environment.apiUrl}/api/v1/empresa/${empresa_id}/sucursales/`, JSON.stringify(sucursal), {});
  }

  editSucursal(sucursal: any, id: number, empresa_id: any) {
    return this.http.put(`${environment.apiUrl}/api/v1/empresa/${empresa_id}/sucursales/${id}/`, JSON.stringify(sucursal), {});
  }

  getAlmacenes(params?: string) {
    if (params) {
      return this.http.get(`${environment.apiUrl}/api/v1/almacenes/`, {params: { 'search': params }})
                    .pipe(
                      map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/almacenes/` )
                      .pipe(
                        map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getAlmacenesEmpresa(idEmpresa: number) {
    return this.http.get(`${environment.apiUrl}/api/v1/empresas/${idEmpresa}/almacenes/` )
                      .pipe(
                        map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
  }

  addAlmacen(sucursal: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/almacenes/`, JSON.stringify(sucursal), {});
  }

  editAlmacen(sucursal: any, id: number) {
    return this.http.put(`${environment.apiUrl}/api/v1/almacenes/${id}/`, JSON.stringify(sucursal), {});
  }

  getMovimientosActivosAlmacen(almacenId: number, params?: string) {
    if (params) {
      return this.http.get(`${environment.apiUrl}/api/v1/almacenes/${almacenId}/movimientos/`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/almacenes/${almacenId}/movimientos/`)
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  asignarMovimientoSucursal(almacen: any, movimiento: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/almacenes/${almacen.id}/movimientos/`, JSON.stringify(movimiento), {});
  }



  getEmpresasActivosAlmacen(almacenId: number, params?: string) {
    if (params) {
      return this.http.get(`${environment.apiUrl}/api/v1/almacenes/${almacenId}/empresas/`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/almacenes/${almacenId}/empresas/`)
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  asignarEmpresaSucursal(almacen: any, registro: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/almacenes/${almacen.id}/empresas/`, JSON.stringify(registro), {});
  }
}
