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

import { SharedService, NotificationsService, MantenimientoService } from '../../../../services/services.index';

@Component({
  selector: 'app-edit-medicamento',
  templateUrl: './edit-medicamento.component.html',
  styleUrls: ['./edit-medicamento.component.scss']
})
export class EditMedicamentoComponent {
  @Input() registro;
  @Output() submitChange = new EventEmitter();

  action: Subject<any> = new Subject();
  disabled: boolean = false;

  registerForm: FormGroup;
  nombre: FormControl;
  presentacion: FormControl;

  tipos_presentacion: any = [];

  presentacion_default: number = 0;

  constructor(
        public modalRef: MDBModalRef,
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        public notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getPresentacionMedicamento();
    this.createFormControls();
    this.createForm();

    this.presentacion_default = this.registro.presentacion;

  }

  getPresentacionMedicamento() {
    this.mantenimientoService.getPresentacionMedicamento()
                             .subscribe((response: any) => {
                                for (let i = 0; i < response.results.length; i++) {
                                  this.tipos_presentacion.push({value: response.results[i].id, label: response.results[i].nombre})
                                }

                                this.registerForm.patchValue({
                                    presentacion: this.registro.presentacion
                                })

                              });
  }

  createFormControls() {
    this.nombre = new FormControl(this.registro.nombre, Validators.required);
    this.presentacion = new FormControl(this.presentacion_default, Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
        presentacion: this.presentacion,
     });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.mantenimientoService.editObjectMantenimiento('maestros/medicamentos', this.registerForm.value, this.registro.id, this.sharedService.organizacion_seleccionada.id)
                              .subscribe({
                                next: (response) => {
                                  this.action.next(true);
                                  this.notificationService.showInfo('Registro editado' , this.registro.nombre);
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
