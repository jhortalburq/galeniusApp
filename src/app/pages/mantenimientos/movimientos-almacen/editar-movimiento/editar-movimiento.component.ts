import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

import { Observable } from 'rxjs';
import { Opcion } from '../../../../interfaces/option';

import { MDBModalRef } from '../../../../../../ng-uikit-pro-standard/src/public_api';
import { SharedService, MantenimientoService, EmpresaService } from '../../../../services/services.index';

import { NotificationsService } from '../../../../services/notifications.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-editar-movimiento',
  templateUrl: './editar-movimiento.component.html',
  styleUrls: ['./editar-movimiento.component.scss']
})
export class EditarMovimientoComponent implements OnInit {

    content: any;
    action: Subject<any> = new Subject();
  
    @Input() registro;
    @Output() submitChange = new EventEmitter();
  
    registerForm: FormGroup;
  
    descripcion: FormControl;
    tipo: FormControl;
  
    optionTipoMovimiento: any = [
      {label: 'ENTRADA', value: 'E'},
      {label: 'SALIDA', value: 'S'},
  ];
  
    constructor(
          public modalRef: MDBModalRef,
          public fb: FormBuilder,
          public mantenimientoService: MantenimientoService,
          public sharedService: SharedService,
          public empresaService: EmpresaService,
          public notificationService: NotificationsService
    ) { }
  
    ngOnInit(): void {
      this.createFormControls();
      this.createForm();
    }
  
    createFormControls() {
      this.descripcion = new FormControl(this.content.registro.descripcion, Validators.required);
      this.tipo = new FormControl(this.content.registro.tipo, Validators.required);
    }
  
    createForm() {
       this.registerForm = new FormGroup({
        descripcion: this.descripcion,
        tipo: this.tipo
       });
    }

    onSubmit() {
  
      if (this.registerForm.valid) {
  
          this.mantenimientoService.editObject('movimientos-almacen', this.registerForm.value, this.content.registro.id ).subscribe(
            (response) => {
              console.log(response);
                this.action.next( true );
                this.notificationService.showSuccess('Se editó el registro correctamente' , 'Movimento Almacén');
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
  