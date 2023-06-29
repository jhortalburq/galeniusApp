import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from '../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    FormArray,
    Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { Opcion } from '../../../interfaces/option';

import { SharedService, EmpresaService, NotificationsService, MantenimientoService } from '../../../services/services.index';



@Component({
  selector: 'app-agregar-organizacion',
  templateUrl: './agregar-organizacion.component.html',
  styleUrls: ['./agregar-organizacion.component.scss']
})
export class AgregarOrganizacionComponent {
  action: Subject<any> = new Subject();
  disabled: boolean = false;

  registerForm: FormGroup;
  nombre: FormControl;
  flag_cm_multiples: FormControl;
  modulos_id: FormArray;

  _modulos: any = [];

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
    this.getModulos();
  }

  createFormControls() {
    this.nombre = new FormControl('', Validators.required);
    this.flag_cm_multiples = new FormControl(false);
    this.modulos_id = new FormArray([]);
  }

  createForm() {
     this.registerForm = new FormGroup({
        nombre: this.nombre,
        flag_cm_multiples: this.flag_cm_multiples,
        modulos_id: this.modulos_id
     });
  }

  changeCheckbox(item: any) {
      if (item.boolean) {
        this.modulos_id.push(new FormControl(item.id))
      } else {
        let i: number = 0;
        this.modulos_id.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == item.id) {
            this.modulos_id.removeAt(i);
            return;
          }
          i++;
        });  
      }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.disabled = true;

      this.empresaService.addOrganizacion(this.registerForm.value).subscribe({
        next: (response) => {
          this.action.next(true);
          this.notificationService.showInfo('Registro creado' , 'Organización');
          this.modalRef.hide();
        },
        error:  err => {
          this.disabled = false;
          this.notificationService.showError(JSON.stringify(err.error), '');

        }
      })
    }
  }

  getModulos() {
    this.mantenimientoService.getDataModulos().subscribe((response: any) => {
      this._modulos = response.results;
    });
  }

}
