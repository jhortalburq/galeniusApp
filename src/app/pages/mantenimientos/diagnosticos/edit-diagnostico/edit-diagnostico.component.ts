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
  selector: 'app-edit-diagnostico',
  templateUrl: './edit-diagnostico.component.html',
  styleUrls: ['./edit-diagnostico.component.scss']
})
export class EditDiagnosticoComponent {
  @Input() registro;
  @Output() submitChange = new EventEmitter();

  action: Subject<any> = new Subject();
  disabled: boolean = false;

  registerForm: FormGroup;
  nombre: FormControl;
  recomendacion: FormControl;
  conclusion: FormControl;
  cie: FormControl;

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
    this.conclusion = new FormControl(this.registro.conclusion);
    this.recomendacion = new FormControl(this.registro.recomendacion);
    this.cie = new FormControl(this.registro.cie);
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
        cie: this.cie,
        recomendacion: this.recomendacion,
        conclusion: this.conclusion
     });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.mantenimientoService.editObjectMantenimiento('maestros/diagnosticos', this.registerForm.value, this.registro.id, this.empresaService.empresa_seleccionada.id)
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
