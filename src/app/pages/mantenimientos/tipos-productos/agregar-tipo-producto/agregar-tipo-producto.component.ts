import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import { Observable } from 'rxjs';

import { SharedService, MantenimientoService, EmpresaService } from '../../../../services/services.index';

import { Subject } from 'rxjs';
import { NotificationsService } from '../../../../services/notifications.service';

@Component({
  selector: 'app-agregar-tipo-producto',
  templateUrl: './agregar-tipo-producto.component.html',
  styleUrls: ['./agregar-tipo-producto.component.scss']
})
export class AgregarTipoProductoComponent implements OnInit {

    registerForm: FormGroup;
  
    nombre: FormControl;
    abreviado: FormControl;
    codigo_tributario: FormControl;

    action: Subject<any> = new Subject();
  
    constructor(
          public modalRef: MDBModalRef,
          public fb: FormBuilder,
          public mantenimientoService: MantenimientoService,
          public sharedService: SharedService,
          public empresaService: EmpresaService,
          public notificationService: NotificationsService
    ) {}
  
    ngOnInit(): void {
  
      this.createFormControls();
      this.createForm();
  
    }
  
    createFormControls() {
      this.nombre = new FormControl('', Validators.required);
      this.abreviado = new FormControl('');
      this.codigo_tributario = new FormControl('');
    }
  
    createForm() {
       this.registerForm = new FormGroup({
        nombre: this.nombre,
        abreviado: this.abreviado,
        codigo_tributario: this.codigo_tributario,
       });
    }
  
    onSubmit() {
  
      if (this.registerForm.valid) {
  
          this.mantenimientoService.addObject('tipos-productos', this.registerForm.value ).subscribe(
            (response) => {
              console.log(response);
                this.action.next( true );
                this.notificationService.showSuccess('Se creó el registro correctamente' , 'Tipo Producto');
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
  