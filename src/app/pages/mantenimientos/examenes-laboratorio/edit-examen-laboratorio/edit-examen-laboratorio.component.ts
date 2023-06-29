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
  selector: 'app-edit-examen-laboratorio',
  templateUrl: './edit-examen-laboratorio.component.html',
  styleUrls: ['./edit-examen-laboratorio.component.scss']
})
export class EditExamenLaboratorioComponent {
  @Input() registro;
  @Output() submitChange = new EventEmitter();

  action: Subject<any> = new Subject();
  disabled: boolean = false;

  registerForm: FormGroup;
  nombre: FormControl;
  clave: FormControl;

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
    this.clave = new FormControl(this.registro.clave, Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
        clave: this.clave,
     });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.mantenimientoService.editObjectMantenimiento('maestros/examenes-laboratorio', this.registerForm.value, this.registro.id, this.empresaService.empresa_seleccionada.id)
                              .subscribe({
                                next: (response) => {
                                  this.action.next(true);
                                  this.notificationService.showInfo('Registro editado' , 'Examen de Laboratorio');
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
