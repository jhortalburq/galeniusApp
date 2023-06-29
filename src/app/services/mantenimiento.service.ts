import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { EMPTY } from 'rxjs'

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

  getQueryset(tipo: string, org: number, cm: number, params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/${tipo}`, {params: { 'empresa': org, 'cm': cm, 'search': params }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/${tipo}`, {params: { 'empresa': org, 'cm': cm }})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  getFichasExamenes() {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/fichas`, {})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
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

  getDataMantenimiento(source: string, org: number, params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/${source}`, {params: { 'organizacion': org, 'search': params }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/${source}`, {params: {'organizacion': org}})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  addObjectMantenimiento(tipo: string, registro: any, org: number) {
    registro['organizacion'] = org
    return this.http.post(`${environment.apiUrl}/api/v1/${tipo}`, JSON.stringify(registro), {params: {'organizacion': org}});
  }

  editObjectMantenimiento(tipo: string, registro: any, id: number, org: number) {
    return this.http.put(`${environment.apiUrl}/api/v1/${tipo}/${id}`, JSON.stringify(registro), {params: {'organizacion': org}});
  }

  addEspecialidad(registro: any, org: number, cm: number) {
    registro['organizacion'] = org
    registro['sucursal'] = [cm]
    return this.http.post(`${environment.apiUrl}/api/v1/especialidades`, JSON.stringify(registro), {params: {'empresa': org, 'cm': cm}});
  }

  editEspecialidad(registro: any, id: number, org: number, cm: number) {
    registro['sucursal'] = [cm]
    return this.http.put(`${environment.apiUrl}/api/v1/especialidades/${id}`, JSON.stringify(registro), {params: {'empresa': org, 'cm': cm}});
  }

  getPresentacionMedicamento(params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/presentacion-medicamentos`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/presentacion-medicamentos`, {})
                      .pipe(map( (res: any) => {
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  addEstudioGabinete(registro: any, org: number, items: any) {
    registro['organizacion'] = org
    registro['procedimientos'] = items;
    return this.http.post(`${environment.apiUrl}/api/v1/maestros/estudios-gabinete`, JSON.stringify(registro), {params: {'organizacion': org}});
  }

  editEstudioGabinete(registro: any, id: number, org: number, items: any) {
    registro['organizacion'] = org
    registro['procedimientos'] = items;
    return this.http.put(`${environment.apiUrl}/api/v1/maestros/estudios-gabinete/${id}`, JSON.stringify(registro), {params: {'organizacion': org}});
  }

  getOptionsItems(org: number, params: string) {
    if (params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/maestros/items-estudios-gabinete`, { params: { 'search': params , 'organizacion': org} })
                    .pipe(map( (res: any) => {
                              return res['results'];
                          }),
                          catchError(this.sharedService.handleError)
                          );
    } else {
      return EMPTY;
    }
  }

  getExamenLaboratorio(id: string, org: number) {
    return this.http.get(`${environment.apiUrl}/api/v1/maestros/examenes-laboratorio/${id}`, { params: { 'organizacion': org} })
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
  }
}
