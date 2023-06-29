import { Component, Input } from '@angular/core';
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
  selector: 'app-nuevo-grupo',
  templateUrl: './nuevo-grupo.component.html',
  styleUrls: ['./nuevo-grupo.component.scss']
})
export class NuevoGrupoComponent {
  @Input() examen_id;

  action: Subject<any> = new Subject();
  disabled: boolean = false;

  registerForm: FormGroup;
  nombre: FormControl;
  examen: FormControl;

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
    this.examen = new FormControl(this.examen_id);
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
        examen: this.examen
     });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.mantenimientoService.addObjectMantenimiento('maestros/grupos-laboratorio', this.registerForm.value, this.empresaService.empresa_seleccionada.id)
                                  .subscribe({
                                    next: (response) => {
                                      this.action.next(true);
                                      this.notificationService.showSuccess('Registro creado' , 'Grupo de Laboratorio');
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
