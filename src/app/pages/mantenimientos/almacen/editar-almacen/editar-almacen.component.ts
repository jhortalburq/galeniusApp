import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import { SharedService, AlmacenService, EmpresaService } from '../../../../services/services.index';

import { NotificationsService } from '../../../../services/notifications.service';

@Component({
  selector: 'app-editar-almacen',
  templateUrl: './editar-almacen.component.html',
  styleUrls: ['./editar-almacen.component.scss']
})
export class EditarAlmacenComponent implements OnInit {
    @Input() registro;
    @Output() submitChange = new EventEmitter();
  
    registerForm: FormGroup;
    almacen: FormControl;
    abreviado: FormControl;
    codigo_almacen: FormControl;
    num_ingreso: FormControl;
    direccion: FormControl;
    num_salida: FormControl;
    responsable: FormControl;
  
    content: any;
  
    constructor(
          public modalRef: MDBModalRef,
          public fb: FormBuilder,
          public empresaService: EmpresaService,
          public almacenService: AlmacenService,
          public sharedService: SharedService,
          public notificationService: NotificationsService
    ) { }
  
    ngOnInit(): void {
      this.createFormControls();
      this.createForm();
    }
  
    createFormControls() {
      this.almacen = new FormControl(this.registro.almacen, Validators.required);
      this.abreviado = new FormControl(this.registro.abreviado);
      this.codigo_almacen = new FormControl(this.registro.codigo_almacen);
      this.num_ingreso = new FormControl(this.registro.num_ingreso);
      this.direccion = new FormControl(this.registro.direccion);
      this.num_salida = new FormControl(this.registro.num_salida);
      this.responsable = new FormControl(this.registro.responsable);
    }
  
    createForm() {
       this.registerForm = new FormGroup({
        almacen: this.almacen,
        abreviado: this.abreviado,
        direccion: this.direccion,
        codigo_almacen: this.codigo_almacen,
        num_ingreso: this.num_ingreso,
        num_salida: this.num_salida,
        responsable: this.responsable,
       });
  
    }
  
    onSubmit(){
  
      if (this.registerForm.valid) {
  
          this.almacenService.editAlmacen( this.registerForm.value, this.registro.id ).subscribe(
            (response) => {
                  this.submitChange.emit(true);
                  this.notificationService.showSuccess('Se editó el registro correctamente' , 'Almacén');
              },
              err => {
                    console.log(err);
                    this.submitChange.emit(false);
                  }
          );
  
      }
    }
  
   
  }
  