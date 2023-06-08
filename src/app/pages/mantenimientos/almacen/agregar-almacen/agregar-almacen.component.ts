import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import { SharedService, AlmacenService, EmpresaService } from '../../../../services/services.index';

import { Subject } from 'rxjs';
import { NotificationsService } from '../../../../services/notifications.service';

@Component({
  selector: 'app-agregar-almacen',
  templateUrl: './agregar-almacen.component.html',
  styleUrls: ['./agregar-almacen.component.scss']
})
export class AgregarAlmacenComponent implements OnInit {

    registerForm: FormGroup;
    almacen: FormControl;
    abreviado: FormControl;
    codigo_almacen: FormControl;
    num_ingreso: FormControl;
    direccion: FormControl;
    num_salida: FormControl;
    responsable: FormControl;
  
    action: Subject<any> = new Subject();
  
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
      this.almacen = new FormControl('', Validators.required);
      this.abreviado = new FormControl('');
      this.codigo_almacen = new FormControl('');
      this.num_ingreso = new FormControl(0);
      this.direccion = new FormControl('');
      this.num_salida = new FormControl(0);
      this.responsable = new FormControl('');
    }
  
  
    createForm() {
       this.registerForm = new FormGroup({
        almacen: this.almacen,
        abreviado: this.abreviado,
        direccion: this.direccion,
        codigo_almacen: this.codigo_almacen,
        num_ingreso: this.num_ingreso,
        num_salida: this.num_salida,
        responsable: this.responsable
       });
  
    }
  
    onSubmit() {
  
      if (this.registerForm.valid ) {
  
          this.almacenService.addAlmacen( this.registerForm.value ).subscribe(
            (response) => {
                this.action.next( true );
                this.notificationService.showSuccess('Se creó el registro correctamente' , 'Almacén');
                this.modalRef.hide();
              },
              err => {
                    console.log(err);
              }
          );
  
      }
    }
  

  }
  
  