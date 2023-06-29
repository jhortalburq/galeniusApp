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
  selector: 'app-add-indicacion',
  templateUrl: './add-indicacion.component.html',
  styleUrls: ['./add-indicacion.component.scss']
})
export class AddIndicacionComponent {
  action: Subject<any> = new Subject();
  disabled: boolean = false;

  registerForm: FormGroup;
  nombre: FormControl;

  constructor(
        public modalRef: MDBModalRef,
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        public notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.nombre = new FormControl('', Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
     });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.mantenimientoService.addObjectMantenimiento('maestros/indicaciones-medicas', this.registerForm.value, this.sharedService.organizacion_seleccionada.id)
                                  .subscribe({
                                    next: (response: any) => {
                                      this.action.next(true);
                                      this.notificationService.showInfo('Registro creado' , response.nombre);
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
