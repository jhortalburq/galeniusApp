import { Injectable } from '@angular/core';

import { NotificationsService } from './notifications.service';


@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  public modulo: string | null;

  constructor(
        public notificationService: NotificationsService
  ) {
    this.modulo = localStorage.getItem('modulo');
  }

  setModuloName(modulo: string, modulo_rl: string) {
    localStorage.setItem('last_modulo', modulo_rl);
    localStorage.setItem('modulo', modulo);
    this.notificationService.showWarning('Se Ingresó al modulo' , modulo);
    this.modulo = modulo;
  }
}
