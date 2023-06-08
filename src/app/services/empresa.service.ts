import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import {catchError, map} from 'rxjs/operators';

import { SharedService } from './shared.service'

@Injectable({
  providedIn: 'root'
})

export class EmpresaService {

  public empresas: Array<any> = [];

  public empresa_seleccionada = {
    razon_social: null,
    no_documento: null,
    id: null
  };

  constructor(private http: HttpClient,
              private sharedService: SharedService) {
  }

  getEmpresasUsuario(params?: string) {
    if (params && params.length > 2) {
      return this.http.get(`${environment.apiUrl}/api/v1/empresas/`, {params: { 'search': params }})
                    .pipe(map( (res: any) => {
                          this.empresas = res.results;
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else {
      return this.http.get(`${environment.apiUrl}/api/v1/empresas/`)
                      .pipe(map( (res: any) => {
                            this.empresas = res.results.filter( (item: any) => item.activo === true)
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }
  }

  // setEmpresaSeleccionada(empresa_seleccionada: any){
  //     this.empresa_seleccionada = this.empresa_seleccionada;
  // }

  getEmpresaActivaUsuario() {
    return this.http.get(`${environment.apiUrl}/api/v1/empresas/seleccionado/`);
  }

  setEmpresaActivaUsuario(empresa: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/empresas/${empresa.id}/seleccionar/`, {}, {});
  }

  addEmpresa(empresa: any) {
    return this.http.post(`${environment.apiUrl}/api/v1/empresas/`, JSON.stringify(empresa), {});
  }

  editEmpresa(empresa: any, id: number) {
    return this.http.put(`${environment.apiUrl}/api/v1/empresas/${id}/`, JSON.stringify(empresa), {});
  }

  subirLogotipo( archivo: File, id: number) {

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

          xhr.open('PUT', `${environment.apiUrl}/api/v1/empresas/${id}/set_logo/`, true);
          xhr.setRequestHeader("Authorization", `JWT ${localStorage.getItem('token')}`);
          xhr.send( formData );

    })
  }

  getValidarDocumento(codigo: number, no_documento: string) {
    if (codigo === 6 && no_documento.length === 11) {
      return this.http.get(`${environment.sunatUrl}/public/api/ruc/${no_documento}`)
                    .pipe(map( (res: any) => {
                          return res;
                      }),
                    catchError(this.sharedService.handleError)
                  );
    } else if (codigo === 1 && no_documento.length === 8){
      return this.http.get(`${environment.sunatUrl}/public/api/dni/${no_documento}`)
                      .pipe(map( (res: any) => {
                            // this.empresas = res.results.filter( (item: any) => item.activo === true)
                        console.log(res)
                            return res;
                        }),
                      catchError(this.sharedService.handleError)
                    );
    }  else {
      return null
    }
  }
}
