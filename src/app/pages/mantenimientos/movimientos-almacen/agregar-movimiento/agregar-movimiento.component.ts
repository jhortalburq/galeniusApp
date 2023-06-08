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
  selector: 'app-agregar-movimiento',
  templateUrl: './agregar-movimiento.component.html',
  styleUrls: ['./agregar-movimiento.component.scss']
})
export class AgregarMovimientoComponent implements OnInit {

    registerForm: FormGroup;
  
    descripcion: FormControl;
    tipo: FormControl;
  
    optionTipoMovimiento: any = [
        {label: 'ENTRADA', value: 'E'},
        {label: 'SALIDA', value: 'S'},
    ];
  
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
      this.descripcion = new FormControl('', Validators.required);
      this.tipo = new FormControl('E', Validators.required);
    }
  
    createForm() {
       this.registerForm = new FormGroup({
        descripcion: this.descripcion,
        tipo: this.tipo,
       });
    }
  
    onSubmit() {
  
      if (this.registerForm.valid) {
  
          this.mantenimientoService.addObject('movimientos-almacen', this.registerForm.value ).subscribe(
            (response) => {
              console.log(response);
                this.action.next( true );
                this.notificationService.showSuccess('Se creó el registro correctamente' , 'Movimiento Almacén');
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
  