import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import {
  SharedService,
  MantenimientoService,
  PacientesService,
  CitasService,
  AlertService,
  NotificationsService,
} from '../../../../services/services.index';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-ingresar-pago',
  templateUrl: './ingresar-pago.component.html',
  styleUrls: ['./ingresar-pago.component.scss']
})
export class IngresarPagoComponent {
  @Input() cita_id;

  disabled: boolean = false;

  action: Subject<any> = new Subject();

  registro = {
                total: 0,
                items: [
                    {concepto: '', valor: ''}
                ]
             }

  constructor(
      public modalRef: MDBModalRef,
      public fb: FormBuilder,
      public mantenimientoService: MantenimientoService,
      public sharedService: SharedService,
      public citasService: CitasService,
      public notificationService: NotificationsService,
      public alertService: AlertService,
      public pacientesService: PacientesService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.disabled = true;

    this.citasService.registarPagoCita(this.registro, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id, this.cita_id)
    .subscribe({
      next: (res: any) => {
        this.alertService.successSwalToast('Pago Registrado', 2000);
        this.disabled = false;
        this.action.next(true);
        this.modalRef.hide();
      },
      error: (err: any) => {
        this.disabled = false;
        this.notificationService.showError(JSON.stringify(err.error), '');
      }
    })

  }

  addInline() {
    this.registro.items.push({concepto: '', valor: ''})
  }
}
