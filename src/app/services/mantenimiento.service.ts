import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {catchError, map} from 'rxjs/operators';
import { SharedService } from './shared.service'


@Injectable({
  providedIn: 'root'
})

export class MantenimientoService {

  // public clientes: Array<any>;

  constructor(private http: HttpClient,
    private sharedService: SharedService) {
  }

  getDataModulos() {
      return this.http.get(`${environment.apiUrl}/api/v1/modulos`)
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
  }

  getQueryset(tipo: string, params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/${tipo}/`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          // this.empresas = res.results;
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/${tipo}/`)
                      .pipe(map( (res: any) => {
                            // this.empresas = res.results.filter( (item: any) => item.activo === true)
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  addObject(tipo: string, registro: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/${tipo}/`, JSON.stringify(registro), {})
  }

  editObject(tipo: string, registro: any, id: number) {
    return this.http.put(`${environment.apiUrl}/api/v1/${tipo}/${id}/`, JSON.stringify(registro), {});
  }

  getOptionsField() {
    return this.http.get(`${environment.apiUrl}/api/v1/clientes/fields_options/`, {})
  }

  getVendedores(empresa_id: string | null, params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/empresa/${empresa_id}/vendedores/`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          // this.empresas = res.results;
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/empresa/${empresa_id}/vendedores/`)
                      .pipe(map( (res: any) => {
                            // this.empresas = res.results.filter( (item: any) => item.activo === true)
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  addVendedor(cliente: any, empresa_id: string) {
    return this.http.post(`${environment.apiUrl}/api/v1/empresa/${empresa_id}/vendedores/`, JSON.stringify(cliente), {})
  }

  editVendedor(cliente: any, id: number, empresa_id: string) {
    return this.http.put(`${environment.apiUrl}/api/v1/empresa/${empresa_id}/vendedores/${id}/`, JSON.stringify(cliente), {});
  }

  getFamiliaLineasProducto(idFamilia: number) {
    return this.http.get(`${environment.apiUrl}/api/v1/lineas-productos/?familia=${idFamilia}`)
                    .pipe(map( (res: any) => {
                          // this.empresas = res.results.filter( (item: any) => item.activo === true)
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  getSubLineaProductoLineas(idFamilia: number, idLinea: number) {
    return this.http.get(`${environment.apiUrl}/api/v1/sublineas-productos/?familia=${idFamilia}&linea=${idLinea}`)
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  getRegistrosCaracteristica(caracteristica_id: number) {
      return this.http.get(`${environment.apiUrl}/api/v1/caracteristicas/${caracteristica_id}/registros/`)
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
  }

  addRegistroCaracteristica(registro: any, caracteristica_id: number) {
    return this.http.post(`${environment.apiUrl}/api/v1/caracteristicas/${caracteristica_id}/registros/`, JSON.stringify(registro), {})
  }
 
  getEspecialidades(empresa_id: number|null, cm: number|null, params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/empresa/${empresa_id}/vendedores/`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          // this.empresas = res.results;
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/especialidades`, {params: { 'empresa': empresa_id, 'cm': cm }})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getTiposDocumentos(params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/tipos-documentos`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/tipos-documentos`, {})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getTiposGeneros(params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/generos`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/generos`, {})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getTiposEstadosCivil(params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/estados-civil`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/estados-civil`, {})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getTiposGradosInstruccion(params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/grados-instruccion`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/grados-instruccion`, {})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getTiposDepartamento(params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/departamentos`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/departamentos`, {})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getTiposProvincia(cod_depart: string) {
    return this.http.get(`${environment.apiUrl}/api/v1/maestros/provincias`, {params: { 'cod_depart': cod_depart }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }

  getTiposDistritos(cod_depart: string, cod_provin: string) {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/distritos`, {params: { 'cod_depart': cod_depart, 'cod_provin': cod_provin}})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
  }

  getEspecialistas(empresa_id: number|null, cm: number|null, especialidad: number|null) {
    return this.http.get(`${environment.apiUrl}/api/v1/especialidades/${especialidad}/especialistas`, {params: { 'empresa': empresa_id, 'cm': cm }})
      .pipe(map( (res: any) => {
            return res;
        }),
      catchError(this.sharedService.handleError)
    );
  }
}
