import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    FormArray,
    Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { SharedService, EmpresaService, NotificationsService, MantenimientoService } from '../../../../services/services.index';

@Component({
  selector: 'app-edit-tipo-cita',
  templateUrl: './edit-tipo-cita.component.html',
  styleUrls: ['./edit-tipo-cita.component.scss']
})
export class EditTipoCitaComponent {
  @Input() registro;
  @Output() submitChange = new EventEmitter();

  action: Subject<any> = new Subject();
  disabled: boolean = false;

  registerForm: FormGroup;
  nombre: FormControl;

  constructor(
        public modalRef: MDBModalRef,
        public empresaService: EmpresaService,
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        public notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.nombre = new FormControl(this.registro.nombre, Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
     });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.mantenimientoService.editObjectMantenimiento('maestros/tipos-citas', this.registerForm.value, this.registro.id, this.empresaService.empresa_seleccionada.id)
                              .subscribe({
                                next: (response) => {
                                  this.action.next(true);
                                  this.notificationService.showInfo('Registro editado' , 'Tipo de Cita');
                                  this.modalRef.hide();
                                },
                                error:  err => {
                                  this.disabled = false;
                                  this.notificationService.showError(JSON.stringify(err.error), '');

                                }
                              })
    }
  }
}
