import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { MDBModalRef } from '../../../../../ng-uikit-pro-standard/src/public_api';
import { Router } from '@angular/router';

import { BreadcrumbsService } from '../../../services/services.index';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent {
  action: Subject<any> = new Subject();

  constructor(
    public modalRef: MDBModalRef,
    private router: Router,
    public breadcrumbService: BreadcrumbsService,
  ) {}

  regresar() {
    this.action.next(false);
    this.modalRef.hide();
  }

  cancelar() {
    this.modalRef.hide();
    let url = `/${this.breadcrumbService.modulo.toLowerCase()}/pacientes/lista`;
    this.router.navigate([url]);
  }

  guardar() {
    this.action.next(true);
    this.modalRef.hide();
  }

}
