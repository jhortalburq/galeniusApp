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
  selector: 'app-edit-especialidad',
  templateUrl: './edit-especialidad.component.html',
  styleUrls: ['./edit-especialidad.component.scss']
})
export class EditEspecialidadComponent {
  @Input() registro;
  @Output() submitChange = new EventEmitter();

  action: Subject<any> = new Subject();
  disabled: boolean = false;

  registerForm: FormGroup;
  nombre: FormControl;
  ficha: FormControl;
  duracion: FormControl;

  tipos_fichas: any = [];

  ficha_default: number = 0;

  constructor(
        public modalRef: MDBModalRef,
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        public notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getTiposFichas();
    this.createFormControls();
    this.createForm();
    this.ficha_default = this.registro.ficha;
  }

  createFormControls() {
    this.nombre = new FormControl(this.registro.nombre, Validators.required);
    this.ficha = new FormControl(this.ficha_default);
    this.duracion = new FormControl(this.registro.duracion, Validators.required);
  }

  getTiposFichas() {
    this.mantenimientoService.getFichasExamenes()
                             .subscribe((response: any) => {
                                for (let i = 0; i < response.results.length; i++) {
                                  this.tipos_fichas.push({value: response.results[i].id, label: response.results[i].nombre})
                                }

                                this.registerForm.patchValue({
                                  ficha: this.registro.ficha
                                })
                              });
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
        ficha: this.ficha,
        duracion: this.duracion
     });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.mantenimientoService.editEspecialidad(this.registerForm.value, this.registro.id, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
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
