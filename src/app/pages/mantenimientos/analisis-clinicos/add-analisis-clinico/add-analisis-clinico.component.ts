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

import { SharedService, EmpresaService, NotificationsService, MantenimientoService } from '../../../../services/services.index';

@Component({
  selector: 'app-add-analisis-clinico',
  templateUrl: './add-analisis-clinico.component.html',
  styleUrls: ['./add-analisis-clinico.component.scss']
})
export class AddAnalisisClinicoComponent {
  action: Subject<any> = new Subject();
  disabled: boolean = false;

  registerForm: FormGroup;
  nombre: FormControl;
  um: FormControl;
  rango: FormControl;

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
    this.nombre = new FormControl('', Validators.required);
    this.rango = new FormControl('');
    this.um = new FormControl('');
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
        rango: this.rango,
        um: this.um,
     });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.mantenimientoService.addObjectMantenimiento('maestros/analisis', this.registerForm.value, this.empresaService.organizacion_seleccionada.id)
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
