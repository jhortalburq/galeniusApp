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
  selector: 'app-editar-marca',
  templateUrl: './editar-marca.component.html',
  styleUrls: ['./editar-marca.component.scss']
})
export class EditarMarcaComponent implements OnInit {

    content: any;
    action: Subject<any> = new Subject();
  
    @Input() registro;
    @Output() submitChange = new EventEmitter();
  
    registerForm: FormGroup;
  
    nombre: FormControl;

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
      this.nombre = new FormControl(this.content.registro.nombre, Validators.required);
    }
  
    createForm() {
       this.registerForm = new FormGroup({
        nombre: this.nombre,
       });
    }

    onSubmit() {
      if (this.registerForm.valid) {
          this.mantenimientoService.editObject('marcas', this.registerForm.value, this.content.registro.id ).subscribe(
            (response) => {
              console.log(response);
                this.action.next( true );
                this.notificationService.showSuccess('Se editó el registro correctamente' , 'Marca');
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
  