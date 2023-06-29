import { Injectable } from '@angular/core';

import { NotificationsService } from './notifications.service';


@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  public modulo: string = 'SELECCIONE MODULO';
  public title: string = '';

  public flag_dropdown_empresa: boolean = true;
  public flag_dropdown_sucursal: boolean = true;
  public flag_sidebar: boolean = true;

  constructor(
        public notificationService: NotificationsService
  ) {
  }

  setModuloName(modulo: string, notification: boolean, modulo_rl?: string) {
      // localStorage.setItem('last_modulo', modulo_rl);
      // localStorage.setItem('modulo', modulo);
      if (notification){
        this.notificationService.showWarning('Se Ingresó al modulo' , modulo);
      };
      
      this.modulo = modulo;
  }
}
