import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-editar-unidad',
  templateUrl: './editar-unidad.component.html',
  styleUrls: ['./editar-unidad.component.scss']
})
export class EditarUnidadComponent implements OnInit {

  content: any;
  action: Subject<any> = new Subject();

  @Input() registro;
  @Output() submitChange = new EventEmitter();

  registerForm: FormGroup;

  codigo_tributario: FormControl;
  unidad_medida: FormControl;
  nombre_tributario: FormControl;
  codigo: FormControl;
  nombre_um: FormControl;

  filteredUM: Observable<Opcion[]>;

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
    this.nombre_um = new FormControl(this.content.registro.codigo_tributario + "-" + this.content.registro.nombre_tributario, Validators.required);
    this.nombre_tributario = new FormControl(this.content.registro.nombre_tributario, Validators.required);
    this.codigo = new FormControl(this.content.registro.codigo, Validators.required);
    this.unidad_medida = new FormControl(this.content.registro.unidad_medida, Validators.required);
    this.codigo_tributario = new FormControl(this.content.registro.codigo_tributario, Validators.required);
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

  onEditEmpresa(submit: boolean) {
    if (submit) {
        this.action.next( true );
        this.modalRef.hide();
    }
  }

  onSubmit() {

    if (this.registerForm.valid) {

        this.mantenimientoService.editObject('unidades-medida', this.registerForm.value, this.content.registro.id ).subscribe(
          (response) => {
            console.log(response);
              this.action.next( true );
              this.notificationService.showSuccess('Se editó el registro correctamente' , 'Unidad Medida');
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
