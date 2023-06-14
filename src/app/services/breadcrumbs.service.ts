import { Injectable } from '@angular/core';

import { NotificationsService } from './notifications.service';


@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  public modulo: string = 'SELECCIONE MODULO';

  constructor(
        public notificationService: NotificationsService
  ) {
    // this.modulo = localStorage.getItem('modulo');
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
