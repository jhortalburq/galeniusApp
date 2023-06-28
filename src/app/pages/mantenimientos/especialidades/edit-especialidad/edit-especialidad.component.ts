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

  tipos_fichas: any = [];

  constructor(
        public modalRef: MDBModalRef,
        public empresaService: EmpresaService,
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        public notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getTiposFichas();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.nombre = new FormControl(this.registro.nombre, Validators.required);
    this.ficha = new FormControl(this.registro.ficha);
  }

  getTiposFichas() {
    this.mantenimientoService.getFichasExamenes()
                             .subscribe((response: any) => {
                                for (let i = 0; i < response.results.length; i++) {
                                  this.tipos_fichas.push({value: response.results[i].id, label: response.results[i].nombre})
                                }
                              });
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
        ficha: this.ficha
     });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.mantenimientoService.editEspecialidad(this.registerForm.value, this.registro.id, this.empresaService.empresa_seleccionada.id, this.empresaService.sucursal_seleccionada.id)
                              .subscribe({
                                next: (response) => {
                                  this.action.next(true);
                                  this.notificationService.showSuccess('Registro editado' , 'Especialidad');
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
