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
  selector: 'app-add-medicamento',
  templateUrl: './add-medicamento.component.html',
  styleUrls: ['./add-medicamento.component.scss']
})
export class AddMedicamentoComponent {
  action: Subject<any> = new Subject();
  disabled: boolean = false;

  registerForm: FormGroup;
  nombre: FormControl;
  presentacion: FormControl;

  tipos_presentacion: any = [];

  constructor(
        public modalRef: MDBModalRef,
        public empresaService: EmpresaService,
        public sharedService: SharedService,
        public mantenimientoService: MantenimientoService,
        public notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getPresentacionMedicamento();
    this.createFormControls();
    this.createForm();
  }

  getPresentacionMedicamento() {
    this.mantenimientoService.getPresentacionMedicamento()
                             .subscribe((response: any) => {
                                for (let i = 0; i < response.results.length; i++) {
                                  this.tipos_presentacion.push({value: response.results[i].id, label: response.results[i].nombre})
                                }
                              });
  }

  createFormControls() {
    this.nombre = new FormControl('', Validators.required);
    this.presentacion = new FormControl('', Validators.required);
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

      this.mantenimientoService.addObjectMantenimiento('maestros/medicamentos', this.registerForm.value, this.empresaService.organizacion_seleccionada.id)
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
