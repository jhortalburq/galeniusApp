import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { SharedService } from './shared.service'
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EspecialistasService {

  constructor(private http: HttpClient,
    private sharedService: SharedService) {
  }

  // getEspecialistas(id: any, params?: string) {
  //   return this.http.get(`${environment.apiUrl}/api/v1/organizaciones/${id}/sucursales` )
  //                     .pipe(
  //                       map( (res: any) => {
  //                           this.sucursales = res.filter( (item: any) => item.activo === true);
  //                           return res;
  //                       }),
  //                     catchError(this.sharedService.handleError)
  //                   );
  //   }
}
