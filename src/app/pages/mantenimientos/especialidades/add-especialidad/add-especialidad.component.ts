import { Component, OnInit } from '@angular/core';
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
  selector: 'app-add-especialidad',
  templateUrl: './add-especialidad.component.html',
  styleUrls: ['./add-especialidad.component.scss']
})
export class AddEspecialidadComponent {
  action: Subject<any> = new Subject();
  disabled: boolean = false;

  registerForm: FormGroup;
  nombre: FormControl;
  ficha: FormControl;
  duracion: FormControl;

  tipos_fichas: any = [];

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
  }

  getTiposFichas() {
    this.mantenimientoService.getFichasExamenes()
                             .subscribe((response: any) => {
                                for (let i = 0; i < response.results.length; i++) {
                                  this.tipos_fichas.push({value: response.results[i].id, label: response.results[i].nombre})
                                }
                              });
  }

  createFormControls() {
    this.nombre = new FormControl('', Validators.required);
    this.ficha = new FormControl('');
    this.duracion = new FormControl('30', Validators.required);
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

      this.mantenimientoService.addEspecialidad(this.registerForm.value, this.sharedService.organizacion_seleccionada.id, this.sharedService.sucursal_seleccionada.id)
                                  .subscribe({
                                    next: (response: any) => {
                                      this.action.next(true);
                                      this.notificationService.showInfo('Registro creado', response.nombre);
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
