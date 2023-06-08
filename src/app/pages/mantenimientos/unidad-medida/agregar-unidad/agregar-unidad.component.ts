import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import { Observable } from 'rxjs';

import { Opcion } from '../../../../interfaces/option';

import { SharedService, MantenimientoService, EmpresaService } from '../../../../services/services.index';

import { Subject } from 'rxjs';
import { NotificationsService } from '../../../../services/notifications.service';

@Component({
  selector: 'app-agregar-unidad',
  templateUrl: './agregar-unidad.component.html',
  styleUrls: ['./agregar-unidad.component.scss']
})
export class AgregarUnidadComponent implements OnInit {

 
  registerForm: FormGroup;

  codigo_tributario: FormControl;
  unidad_medida: FormControl;
  nombre_tributario: FormControl;
  codigo: FormControl;
  nombre_um: FormControl;

  filteredUM: Observable<Opcion[]>;

  action: Subject<any> = new Subject();

  constructor(
        public modalRef: MDBModalRef,
        public fb: FormBuilder,
        public mantenimientoService: MantenimientoService,
        public sharedService: SharedService,
        public empresaService: EmpresaService,
        public notificationService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.nombre_um = new FormControl('', Validators.required);
    this.unidad_medida = new FormControl('', Validators.required);
    this.codigo_tributario = new FormControl('', Validators.required);
    this.nombre_tributario = new FormControl('', Validators.required);
    this.codigo = new FormControl('', Validators.required);
  }

  createForm() {
     this.registerForm = new FormGroup({
      nombre_um: this.nombre_um,
      unidad_medida: this.unidad_medida,
      codigo_tributario: this.codigo_tributario,
      nombre_tributario: this.nombre_tributario,
      codigo: this.codigo
    });
  }

  buscarUM(e){
    this.filteredUM = this.sharedService.getOptionsUM(e.target.value);
  }

  onKeydown(event) {
    if (event.key === "Backspace" || event.key === "Delete ") {
      this.registerForm.patchValue({
              nombre_um: "",
              codigo_tributario: "",
              nombre_tributario: "",
            });
    }
  }

  selectUM(um: any){
      this.registerForm.patchValue({
                codigo_tributario: um.text.split('-')[0],
                nombre_tributario: um.text.split('-')[1],
      });
  }

  onSubmit() {

    if (this.registerForm.valid) {

        this.mantenimientoService.addObject('unidades-medida', this.registerForm.value ).subscribe(
          (response) => {
            console.log(response);
              this.action.next( true );
              this.notificationService.showSuccess('Se Creó el registro correctamente' , 'Unidad Media');
              this.modalRef.hide();
            },
            err => {
                  console.log(err);
                  this.notificationService.showError(JSON.stringify(err.error), '');

            }
        );

    }
  }
}
